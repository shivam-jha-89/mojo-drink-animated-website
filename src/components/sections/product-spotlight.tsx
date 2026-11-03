import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const SPECS = [
  { label: "Type", value: "Carbonated beverage (cola drink)" },
  { label: "Net volume", value: "300 ml" },
  { label: "Extra", value: "10%" },
];

export function ProductSpotlight() {
  return (
    <section
      id="product"
      aria-labelledby="product-title"
      className="relative overflow-hidden bg-ice py-24 text-charcoal sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-mojo/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 size-[34rem] rounded-full bg-cola-gold/15 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="relative order-2 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 hidden size-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-mojo/15 sm:block"
            />
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-mojo shadow-[0_40px_110px_-30px_rgba(142,6,16,0.6)]">
              <Image
                src="/images/mojo-can.jpg"
                alt="A chilled red MOJO cola can rising out of a cola splash with ice and bubbles."
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#5b040c]/60 via-transparent to-transparent"
              />
              <span className="absolute right-5 top-5 rounded-full bg-lime px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-charcoal">
                10% extra
              </span>
              <span className="absolute bottom-5 left-5 rounded-full border border-ice/25 bg-mojo-deep/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ice backdrop-blur-sm">
                300 ml
              </span>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-mojo">
                <span aria-hidden="true" className="h-px w-10 bg-mojo/50" />
                03 &mdash; The Can
              </p>

              <h2
                id="product-title"
                className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.75rem)] uppercase leading-[0.85] tracking-[-0.02em] text-charcoal"
              >
                Meet the can
                <br />
                that brings it.
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">
                Loud red, cold sweat, and the MOJO mark front and centre. This is
                the can that turns an ordinary pause into the main event.
              </p>

              <dl className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
                {SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 py-4"
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.24em] text-charcoal/45">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm font-semibold text-charcoal">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#splash"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-mojo px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-ice transition-colors hover:bg-mojo-deep"
              >
                Unleash it again
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
