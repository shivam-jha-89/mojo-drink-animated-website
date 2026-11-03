import { ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  { label: "The Splash", href: "#splash" },
  { label: "The Story", href: "#story" },
  { label: "The Feeling", href: "#feeling" },
  { label: "The Can", href: "#product" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#2b0206] py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 size-[22rem] rounded-full bg-mojo/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#splash" aria-label="MOJO home" className="inline-flex items-center gap-3">
              <span className="font-display text-3xl uppercase leading-none tracking-[-0.02em] text-ice">
                MOJO
              </span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice/55">
              A cola with attitude. Made for the moment.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ice/60 transition-colors hover:text-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#splash"
            className="group inline-flex items-center gap-2 self-start text-[10px] font-semibold uppercase tracking-[0.24em] text-ice/60 transition-colors hover:text-lime"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[9px] font-semibold uppercase tracking-[0.22em] text-ice/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MOJO Cola. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-lime/70" />
            Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
