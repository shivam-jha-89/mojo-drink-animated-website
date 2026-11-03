export type ScrollProgressHandler = (progress: number) => void;

export type FrameSource = (index: number) => string;

export interface FrameCanvasHandle {
  setProgress: (progress: number) => void;
}
