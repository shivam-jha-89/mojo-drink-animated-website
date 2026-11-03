import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-mojo py-28 sm:py-36"
    >
      <Image
        src="/images/mojo-campaign.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-20 mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-mojo/60 via-mojo/80 to-mojo-deep/90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-cola-gold/25 blur-[140px]"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-5xl px-6 text-center sm:px-10">
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-ice/70">
            The Refresh
          </p>
          <h2
            id="cta-title"
            className="mt-6 font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.82] tracking-[-0.02em] text-ice"
          >
            Turn up
            <br />
            the <span className="text-lime">refresh.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ice/80 sm:text-base">
            One can. One splash. Zero quiet moments.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#splash"
              className="group inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ice transition-colors hover:bg-ice hover:text-mojo-deep"
            >
              Experience it again
              <ArrowUp
                className="size-4 transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
