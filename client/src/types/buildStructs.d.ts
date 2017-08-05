// Project: Note8
// Definitions by: Jared Johnson http://github.com/jaredjj3

export as namespace BuildStructs;

export interface Position {
  str: number | string;
  fret: string;
}

export interface Tuplet {
  numNotes: number;      // fit this many notes into...
  notesOccupied: number; // ...the space of this many notes
}

export interface Slice {
  duration: number | string;
  positions: Array<Position>;
  dotted?: boolean;
  tuplet?: Tuplet;
  annotation?: string;
}

export interface Measure {
  slices: Array<Slice>;
  annotation?: string;
  width?: number;
}

export interface TimeSignature {
  notesPerMeasure: number;
  kind: number | string;
}

export interface BuildStructs {
  measures: Array<Measure>;
  timeSignature?: TimeSignature;
}