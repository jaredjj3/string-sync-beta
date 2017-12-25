declare namespace Vextab {
  interface Option extends Specs.Base {
    key: string;
    value: string;
  }

  namespace Specs {
    interface Base {
      _l: number;
      _c0: number;
      _c1: number;
    }

    interface Text extends Base {
      text: string;
    }
  
    interface Command extends Base {
      command: string;
      type?: string;
      params?: Array<string> | { position: number } | { tuplet: string };
    }
  
    interface Time extends Base {
      time: string;
      dot: boolean;
    }

    interface TabPos extends Base {
      fret: string;
      decorator: string;
      string: string;
      articulation?: string;
    }
  
    interface Chord extends Base {
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
