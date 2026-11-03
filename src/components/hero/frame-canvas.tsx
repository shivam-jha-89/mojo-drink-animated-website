"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { FrameCanvasHandle } from "@/types/animation";
import { clamp, cn } from "@/lib/utils";

const MAX_CACHED_FRAMES = 60;
const INITIAL_BATCH = 8;
const PREFETCH_CONCURRENCY = 6;
const MAX_LOADING = 8;

type FrameCanvasProps = {
  frameCount: number;
  frameSrc: (index: number) => string;
  label: string;
  className?: string;
  onReady?: () => void;
};

const CAN_WIDTH_RATIO = 0.3;
const CAN_HEIGHT_RATIO = 0.92;
const SAFE_AREA = 0.94;

function decodeFrame(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.src = src;

    if (typeof image.decode === "function") {
      image.decode().then(() => resolve(image)).catch(reject);
      return;
    }

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load frame: ${src}`));
  });
}

export const FrameCanvas = forwardRef<FrameCanvasHandle, FrameCanvasProps>(
  function FrameCanvas(
    { frameCount, frameSrc, label, className, onReady },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backdropRef = useRef<HTMLCanvasElement>(null);
    const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
    const loadingRef = useRef<Set<number>>(new Set());
    const currentRef = useRef(0);
    const lastDrawnRef = useRef(-1);
    const readyRef = useRef(false);
    const prefetchAbortRef = useRef<AbortController | null>(null);
    const [ready, setReady] = useState(false);

    const drawFrame = useCallback((index: number) => {
      const canvas = canvasRef.current;
      const backdrop = backdropRef.current;
      const image = cacheRef.current.get(index);
      if (!canvas || !image) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      if (!canvasWidth || !canvasHeight) return;

      const coverScale = Math.max(
        canvasWidth / image.naturalWidth,
        canvasHeight / image.naturalHeight,
      );
      const canSafeScale = Math.min(
        (canvasWidth * SAFE_AREA) /
          (image.naturalWidth * CAN_WIDTH_RATIO),
        (canvasHeight * SAFE_AREA) /
          (image.naturalHeight * CAN_HEIGHT_RATIO),
      );
      const scale =
        canvasWidth > canvasHeight
          ? coverScale
          : Math.min(coverScale, canSafeScale);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
        image,
        (canvasWidth - drawWidth) / 2,
        (canvasHeight - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );

      if (backdrop && canvasWidth <= canvasHeight) {
        const backdropContext = backdrop.getContext("2d");
        if (backdropContext) {
          const backdropWidth = image.naturalWidth * coverScale;
          const backdropHeight = image.naturalHeight * coverScale;
          backdropContext.clearRect(0, 0, canvasWidth, canvasHeight);
          backdropContext.drawImage(
            image,
            (canvasWidth - backdropWidth) / 2,
            (canvasHeight - backdropHeight) / 2,
            backdropWidth,
            backdropHeight,
          );
        }
      }

      lastDrawnRef.current = index;
      if (!readyRef.current) {
        readyRef.current = true;
        setReady(true);
        onReady?.();
      }
    }, [onReady]);

    const loadFrame = useCallback(
      async (index: number): Promise<HTMLImageElement | null> => {
        if (index < 0 || index >= frameCount) return null;

        const cached = cacheRef.current.get(index);
        if (cached) return cached;
        if (loadingRef.current.has(index)) return null;

        loadingRef.current.add(index);

        try {
          const image = await decodeFrame(frameSrc(index));
          const cache = cacheRef.current;
          cache.delete(index);
          cache.set(index, image);

          if (cache.size > MAX_CACHED_FRAMES) {
            let evictIndex = -1;
            let furthest = -1;
            for (const key of cache.keys()) {
              const distance = Math.abs(key - currentRef.current);
              if (distance > furthest) {
                furthest = distance;
                evictIndex = key;
              }
            }
            if (evictIndex !== -1 && evictIndex !== index) {
              cache.delete(evictIndex);
            }
          }

          if (index === currentRef.current) {
            drawFrame(index);
          }

          return image;
        } catch {
          return null;
        } finally {
          loadingRef.current.delete(index);
        }
      },
      [drawFrame, frameCount, frameSrc],
    );

    const setProgress = useCallback(
      (progress: number) => {
        const index = Math.round(clamp(progress, 0, 1) * (frameCount - 1));
        currentRef.current = index;

        if (cacheRef.current.has(index)) {
          drawFrame(index);
        } else {
          void loadFrame(index);
        }

        if (loadingRef.current.size < MAX_LOADING) {
          for (const offset of [1, -1, 2, -2, 3, -3]) {
            const neighbour = index + offset;
            if (
              neighbour >= 0 &&
              neighbour < frameCount &&
              !cacheRef.current.has(neighbour) &&
              !loadingRef.current.has(neighbour)
            ) {
              void loadFrame(neighbour);
            }
          }
        }
      },
      [drawFrame, frameCount, loadFrame],
    );

    useImperativeHandle(ref, () => ({ setProgress }), [setProgress]);

    useEffect(() => {
      const canvas = canvasRef.current;
      const backdrop = backdropRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(container.clientWidth * dpr));
        const height = Math.max(1, Math.round(container.clientHeight * dpr));

        const changed =
          canvas.width !== width || canvas.height !== height;

        if (changed) {
          canvas.width = width;
          canvas.height = height;
          if (backdrop) {
            backdrop.width = width;
            backdrop.height = height;
          }
          if (lastDrawnRef.current >= 0) drawFrame(lastDrawnRef.current);
        }
      };

      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      return () => observer.disconnect();
    }, [drawFrame]);

    useEffect(() => {
      for (let index = 0; index < Math.min(INITIAL_BATCH, frameCount); index += 1) {
        void loadFrame(index);
      }

      const connection = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection;
      if (connection?.saveData) return;

      const controller = new AbortController();
      prefetchAbortRef.current = controller;

      let cursor = INITIAL_BATCH;
      const worker = async () => {
        while (!controller.signal.aborted) {
          const index = cursor;
          cursor += 1;
          if (index >= frameCount) return;
          await loadFrame(index);
        }
      };

      for (
        let workerIndex = 0;
        workerIndex < PREFETCH_CONCURRENCY;
        workerIndex += 1
      ) {
        void worker();
      }

      return () => {
        controller.abort();
        prefetchAbortRef.current = null;
      };
    }, [frameCount, frameSrc, loadFrame]);

    return (
      <div ref={containerRef} className={cn("absolute inset-0", className)}>
        <canvas
          ref={backdropRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            ready ? "opacity-80" : "opacity-0",
          )}
        />
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={label}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700 ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    );
  },
);
