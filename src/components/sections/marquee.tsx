const WORDS = ["Fizz", "Ice", "Cola", "MOJO"];

export function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-white/10 bg-mojo-deep py-5"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {WORDS.map((word) => (
              <span
                key={`${copy}-${word}`}
                className="flex items-center gap-7 px-7 font-display text-2xl uppercase tracking-[0.06em] text-ice/85 sm:text-3xl"
              >
                {word}
                <span className="size-1.5 rounded-full bg-lime" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
