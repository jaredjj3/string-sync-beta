declare interface SnapshotData {
  tick: number;
  timeMs: number;
  line: any;
  measure: any;
  note: any;
  light: Array<any>;
  justPress: Array<any>;
  press: Array<any>;
  interpolator: any;
  loopData: Array<any>;
  loopTick: Array<number>;
  isLoopScrubbing: boolean;
}
