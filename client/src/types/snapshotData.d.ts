declare interface MaestroData {
  tick: number;
  timeMs: number;
}

declare interface TabData {
  line: any;
  measure: any;
  note: any;
}

declare interface FretboardData {
  lightGuitarPositions: Array<GuitarPosition>;
  justPressGuitarPositions: Array<GuitarPosition>;
  pressGuitarPositions: Array<GuitarPosition>;
}

declare interface LoopData {
  notes: Array<any>;
  tickRange: Array<number>;
  isScrubbing: boolean;
}

declare interface SnapshotData {
  maestro: MaestroData;
  tab: TabData;
  fretboard: FretboardData;
  loop: LoopData;
}
