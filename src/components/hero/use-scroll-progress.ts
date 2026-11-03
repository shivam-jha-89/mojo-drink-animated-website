"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import type { ScrollProgressHandler } from "@/types/animation";
import { clamp } from "@/lib/utils";

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: ScrollProgressHandler,
) {
  useEffect(() => {
    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance > 0 ? clamp(-rect.top / distance, 0, 1) : 0;

      if (Math.abs(progress - last) > 0.0005) {
        last = progress;
        onProgress(progress);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [ref, onProgress]);
}
