declare namespace Directive {
  type Types = 'GRACE_NOTE';
  type Structs = GraceNoteStruct | SuggestedNotesStruct;

  interface Refs {
    staveNote: any;
    tabNote: any;
    stave: any;
    maestro: any;
    measure?: any;
    line?: any;
    note?: any;
  }

  interface BaseStruct {
    type: Types;
  }

  interface GraceNoteStruct extends BaseStruct {
    positions: Array<{fret: number | string, str: number | string}>;
    duration: string;
    slur?: boolean;
  }

  interface SuggestedNotesStruct extends BaseStruct {
    notes: Array<string>;
    fromMeasureIndex: number;
    toMeasureIndex?: number;
    description: string;
  }
}
