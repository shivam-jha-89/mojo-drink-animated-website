import { Bubbles } from "@/components/bubbles";
import { Reveal } from "@/components/reveal";

export function BrandStatement() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden bg-gradient-to-b from-mojo-deep via-[#7a0510] to-mojo-deep py-24 sm:py-32"
    >
      <Bubbles />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 size-[34rem] rounded-full bg-mojo/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-[26rem] rounded-full bg-cola-gold/10 blur-[120px]"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-cola-gold">
            <span aria-hidden="true" className="h-px w-10 bg-cola-gold/70" />
            01 &mdash; The Story
          </p>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <Reveal>
            <h2
              id="story-title"
              className="font-display text-[clamp(2.75rem,7.5vw,7rem)] uppercase leading-[0.85] tracking-[-0.02em] text-ice"
            >
              Not just a cola.
              <br />
              A shot of{" "}
              <span className="text-transparent [-webkit-text-stroke:2px_#f8f7f4]">
                MOJO.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-base leading-relaxed text-muted-white/85 sm:text-lg">
              MOJO is the jolt in the middle of an ordinary day. Deep cola flavor,
              a cold edge, and a splash that refuses to sit still. Crack it open
              and let the moment get loud.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.26em] text-ice/50">
                  Serve
                </dt>
                <dd className="mt-2 font-display text-xl uppercase text-ice sm:text-2xl">
                  Ice cold
                </dd>
              </div>
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.26em] text-ice/50">
                  Volume
                </dt>
                <dd className="mt-2 font-display text-xl uppercase text-ice sm:text-2xl">
                  300 ml
                </dd>
              </div>
              <div>
                <dt className="text-[9px] font-semibold uppercase tracking-[0.26em] text-ice/50">
                  Attitude
                </dt>
                <dd className="mt-2 font-display text-xl uppercase text-lime sm:text-2xl">
                  Maximum
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
