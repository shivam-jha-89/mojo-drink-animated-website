import { Flame, Snowflake, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

const FEATURES = [
  {
    icon: Flame,
    title: "Bold Cola Energy",
    body: "Deep cola flavor with a finish that keeps the volume up. No half measures, no quiet sips.",
  },
  {
    icon: Sparkles,
    title: "A Burst of Fizz",
    body: "Tiny bubbles, big entrance. Every crack of the can is the start of the show.",
  },
  {
    icon: Snowflake,
    title: "Ice-Cold Attitude",
    body: "Built for heat, noise, and the moments that need a cold shock. Serve it colder than cool.",
  },
];

export function RefreshFeatures() {
  return (
    <section
      id="feeling"
      aria-labelledby="feeling-title"
      className="relative overflow-hidden bg-charcoal py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cola-gold/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/4 size-[30rem] rounded-full bg-mojo/20 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 size-[22rem] rounded-full bg-cola-gold/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-cola-gold">
              <span aria-hidden="true" className="h-px w-10 bg-cola-gold/70" />
              02 &mdash; The Feeling
            </p>
            <h2
              id="feeling-title"
              className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] uppercase leading-[0.85] tracking-[-0.02em] text-ice"
            >
              Cold. Loud. <span className="text-mojo">Alive.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="max-w-sm text-sm leading-relaxed text-ice/60 sm:text-base">
              Three reasons MOJO never stays quiet for long.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid divide-y divide-white/10 border-y border-white/10 md:mt-16 md:grid-cols-3 md:divide-x md:divide-y-0">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal
                key={feature.title}
                delay={index * 110}
                className="group relative py-10 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="size-6 text-lime"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-display text-sm text-cola-gold">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-3xl uppercase leading-none text-ice">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice/60">
                  {feature.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-8 block h-px w-12 bg-white/15 transition-all duration-500 group-hover:w-24 group-hover:bg-lime"
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
