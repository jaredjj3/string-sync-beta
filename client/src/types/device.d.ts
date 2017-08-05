export interface Viewport {
  height: number;
  width: number;
  orientation: string;
}

export interface Device {
  isTouch: boolean;
  viewport: Viewport;
  type: string;
}