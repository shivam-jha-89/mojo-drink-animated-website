import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const BUBBLES = [
  { left: "6%", size: 10, delay: "0s", duration: "17s", drift: "30px" },
  { left: "16%", size: 18, delay: "-4s", duration: "21s", drift: "-24px" },
  { left: "27%", size: 7, delay: "-9s", duration: "15s", drift: "18px" },
  { left: "39%", size: 13, delay: "-2s", duration: "23s", drift: "-36px" },
  { left: "52%", size: 6, delay: "-12s", duration: "19s", drift: "26px" },
  { left: "63%", size: 20, delay: "-7s", duration: "25s", drift: "-18px" },
  { left: "74%", size: 9, delay: "-15s", duration: "16s", drift: "34px" },
  { left: "85%", size: 15, delay: "-5s", duration: "22s", drift: "-28px" },
  { left: "93%", size: 7, delay: "-10s", duration: "18s", drift: "20px" },
];

export function Bubbles({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bubbles pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {BUBBLES.map((bubble, index) => {
        const style = {
          left: bubble.left,
          width: bubble.size,
          height: bubble.size,
          animationDelay: bubble.delay,
          animationDuration: bubble.duration,
          "--drift": bubble.drift,
        } as CSSProperties;

        return <span key={index} style={style} />;
      })}
    </div>
  );
}
