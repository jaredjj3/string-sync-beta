declare namespace Vextab {
  interface Option {
    key: string;
    value: string;
    _l: number;
    _c: number;
  }

  namespace Specs {
    interface Text {
      text: string;
      _l: number;
      _c: number;
    }
  
    interface Command {
      command: string;
      type?: string;
      params?: Array<string> | { position: number } | { tuplet: string };
      _l: number;
      _c: number;
    }
  
    interface Time {
      time: string;
      dot: boolean;
    }

    interface TabPos {
      fret: string;
      decorator: string;
      string: string;
      _l: number;
      _c: number;
      articulation?: string;
    }
  
    interface Chord {
      chord: Array<TabPos>
    }
  }
  
  type Spec = Specs.Text | Specs.Command | Specs.Time | Specs.TabPos | Specs.Chord;

  interface Element {
    element: string;
    notes: Array<Spec>;
    options: Array<Option>;
    text: Array<Text>;
  }

  interface Chunk {
    vextabOptionsString: string;
    vextabStringMeasures: Array<string>;
  }

  interface Parser {
    parse(vextabString: string): Array<Element>;
  }
}
