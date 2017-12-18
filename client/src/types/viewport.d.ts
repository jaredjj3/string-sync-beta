declare type Orientation = 'LANDSCAPE' | 'PORTRAIT';
declare type ViewportType = 'MOBILE' | 'DESKTOP';

declare interface Viewport {
  width: number;
  height: number;
  orientation: Orientation;
  type: ViewportType;
  isTouch: boolean;
}
