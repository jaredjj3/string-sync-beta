declare namespace Directive {
  type Types = 'GRACE_NOTE';

  type Structs = GraceNoteStruct;

  interface Refs {
    staveNote: any;
    tabNote: any;
    measure?: any;
    line?: any;
    note?: any;
    tab?: any;
  }

  interface BaseStruct {
    type: Types;
  }

  interface GraceNoteStruct extends BaseStruct {
    positions: Array<{fret: number | string, str: number | string}>;
    duration: string;
    slur?: boolean;
  }
}
