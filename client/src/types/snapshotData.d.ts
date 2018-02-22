declare interface MaestroData {
  tick: number;
  timeMs: number;
}

declare interface ScoreData {
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
  changed: Array<boolean>;
  tickRange: Array<number>;
  isScrubbing: boolean;
}

declare interface FocusedData {
  line: any;
}

declare interface SnapshotData {
  maestro: MaestroData;
  score: ScoreData;
  fretboard: FretboardData;
  loop: LoopData;
  focused: FocusedData;
}
