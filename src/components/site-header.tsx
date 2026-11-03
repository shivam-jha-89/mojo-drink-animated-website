"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "The Splash", href: "#splash" },
  { label: "The Feeling", href: "#feeling" },
  { label: "The Can", href: "#product" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lightHeader, setLightHeader] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const product = document.getElementById("product");
    if (!product) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = product.getBoundingClientRect();
      setLightHeader(rect.top <= 80 && rect.bottom > 80);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent",
          lightHeader
            ? "text-charcoal [text-shadow:none]"
            : "text-ice [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]",
        )}
      >
        <div className="flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#splash"
            aria-label="MOJO home"
            className="flex items-center gap-3"
          >
            <span
              className={cn(
                "font-display text-3xl uppercase leading-none tracking-[-0.02em]",
                lightHeader ? "text-charcoal" : "text-ice",
              )}
            >
              MOJO
            </span>
            <span
              className={cn(
                "hidden text-[8px] font-semibold uppercase leading-[1.2] tracking-[0.3em] sm:block",
                lightHeader ? "text-charcoal/55" : "text-ice/55",
              )}
            >
              Cola
              <br />
              Bangladesh
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-[10px] font-semibold uppercase tracking-[0.26em] transition-colors",
                  lightHeader
                    ? "text-charcoal/70 hover:text-mojo"
                    : "text-ice/75 hover:text-lime",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-0 transition-all duration-300 group-hover:w-full",
                    lightHeader ? "bg-mojo" : "bg-lime",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#product"
              className={cn(
                "hidden items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors sm:inline-flex",
                lightHeader
                  ? "border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ice"
                  : "border-ice/25 text-ice hover:border-ice hover:bg-ice hover:text-mojo-deep",
              )}
            >
              Discover MOJO
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
                lightHeader
                  ? "border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ice"
                  : "border-ice/25 text-ice hover:border-ice hover:bg-ice hover:text-mojo-deep",
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-mojo-deep lg:hidden"
        >
          <div className="flex h-20 w-full items-center justify-between px-5 sm:px-8">
            <span className="flex items-center gap-3">
              <span className="font-display text-3xl uppercase leading-none text-ice">
                MOJO
              </span>
              <span className="text-[8px] font-semibold uppercase leading-[1.2] tracking-[0.3em] text-ice/55">
                Cola
                <br />
                Bangladesh
              </span>
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ice/25 text-ice transition-colors hover:border-ice hover:bg-ice hover:text-mojo-deep"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile primary"
            className="flex w-full flex-1 flex-col px-5 pt-8 sm:px-8"
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-white/10 py-5"
              >
                <span className="text-[10px] font-semibold tracking-[0.2em] text-lime">
                  0{index + 1}
                </span>
                <span className="font-display text-[clamp(2.25rem,10vw,3.5rem)] uppercase leading-none text-ice transition-colors group-hover:text-lime">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="w-full px-5 pb-12 sm:px-8">
            <a
              href="#product"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-between rounded-full bg-ice px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-mojo-deep transition-colors hover:bg-lime hover:text-charcoal"
            >
              Discover MOJO
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-ice/45">
              MOJO Cola &middot; Bangladesh
            </p>
          </div>
        </div>
      )}
    </>
  );
}
