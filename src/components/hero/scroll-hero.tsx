"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { FrameCanvas } from "@/components/hero/frame-canvas";
import { useReducedMotion } from "@/components/hero/use-reduced-motion";
import { useScrollProgress } from "@/components/hero/use-scroll-progress";
import { FRAME_COUNT, frameSrc } from "@/lib/frame-manifest";
import type { FrameCanvasHandle } from "@/types/animation";
import { cn, smoothstep } from "@/lib/utils";

const HERO_LABEL =
  "A red MOJO cola can surrounded by splashing cola, ice cubes, and lime wedges.";

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<FrameCanvasHandle>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [framesReady, setFramesReady] = useState(false);

  const handleReady = useCallback(() => setFramesReady(true), []);

  const handleProgress = useCallback((progress: number) => {
    canvasRef.current?.setProgress(progress);

    const fade = 1 - smoothstep(0.04, 0.24, progress);
    const copy = copyRef.current;
    if (copy) {
      copy.style.opacity = String(fade);
      copy.style.transform = `translate3d(0, ${(1 - fade) * -48}px, 0)`;
      copy.style.pointerEvents = fade < 0.3 ? "none" : "auto";
    }

    const cue = cueRef.current;
    if (cue) {
      cue.style.opacity = String(1 - smoothstep(0.01, 0.08, progress));
    }

    const rail = railRef.current;
    if (rail) {
      rail.style.transform = `scaleY(${Math.max(progress, 0.001)})`;
    }

    const percent = percentRef.current;
    if (percent) {
      percent.textContent = String(Math.round(progress * 100)).padStart(2, "0");
    }

    const end = endRef.current;
    if (end) {
      const reveal = smoothstep(0.82, 0.96, progress);
      end.style.opacity = String(reveal);
      end.style.transform = `translate3d(0, ${(1 - reveal) * 32}px, 0)`;
      end.style.pointerEvents = reveal > 0.6 ? "auto" : "none";
    }
  }, []);

  useScrollProgress(sectionRef, handleProgress);

  return (
    <section
      id="splash"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className={cn("relative bg-mojo-deep", reduced ? "h-svh" : "h-[140vh]")}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-mojo">
        <div
          role="img"
          aria-label={HERO_LABEL}
          className={cn(
            "hero-poster absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out",
            framesReady ? "opacity-0" : "opacity-100",
          )}
        />

        {!reduced && (
          <FrameCanvas
            ref={canvasRef}
            frameCount={FRAME_COUNT}
            frameSrc={frameSrc}
            label={HERO_LABEL}
            onReady={handleReady}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[#3c0207]/90 via-[#5b040c]/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#3c0207]/55 via-transparent to-transparent sm:w-3/4"
        />
        <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

        <div
          ref={copyRef}
          className="absolute inset-x-0 bottom-0 z-20 will-change-transform"
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-ice/80">
              <span className="inline-block size-1.5 rounded-full bg-lime" />
              MOJO Cola &middot; Bangladesh
            </p>

            <h1
              id="hero-title"
              className="mt-5 max-w-4xl font-display text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.02em] text-ice"
            >
              Unleash
              <br />
              the <span className="text-lime">Mojo.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-white/90 sm:text-base">
              A bold cola. A cold shock. A splash of pure attitude.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#feeling"
                className="group inline-flex items-center gap-2 rounded-full bg-ice px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-mojo-deep transition-colors hover:bg-lime hover:text-charcoal focus-visible:outline-lime"
              >
                Feel the fizz
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#product"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ice underline decoration-ice/30 underline-offset-8 transition-colors hover:text-lime hover:decoration-lime"
              >
                Meet the can
              </a>
            </div>
          </div>
        </div>

        <div
          ref={cueRef}
          className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.4em] text-ice/70">
            Scroll to unleash
          </span>
          <span aria-hidden="true" className="cue-line block h-10 w-px bg-ice/60" />
        </div>

        {!reduced && (
          <div
            aria-hidden="true"
            className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-ice/60">
              Splash
            </span>
            <div className="relative h-40 w-px overflow-hidden bg-ice/20">
              <div
                ref={railRef}
                className="absolute inset-x-0 top-0 h-full origin-top bg-lime"
              />
            </div>
            <span
              ref={percentRef}
              className="font-display text-sm tabular-nums text-ice/90"
            >
              00
            </span>
          </div>
        )}

        <div
          ref={endRef}
          className="absolute inset-x-0 bottom-0 z-20 opacity-0 will-change-transform"
        >
          <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-lime">
              <span className="inline-block size-1.5 rounded-full bg-lime" />
              The final pour
            </p>
            <p className="mt-4 font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-none text-ice">
              MOJO Cola <span className="text-ice/45">/ 300 ml</span>
            </p>
            <a
              href="#story"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ice underline decoration-ice/30 underline-offset-8 transition-colors hover:text-lime hover:decoration-lime"
            >
              Keep scrolling
              <ArrowDown
                className="size-4 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
