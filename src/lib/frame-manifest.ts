export const FRAME_COUNT = 60;

const FRAME_BASE = "/frames/mojo";

export const POSTER_SRC = "/images/mojo-splash-poster.png";

export function frameSrc(index: number): string {
  const frame = Math.min(Math.max(index, 0), FRAME_COUNT - 1) + 1;
  return `${FRAME_BASE}/frame_${String(frame).padStart(4, "0")}.jpg`;
}
