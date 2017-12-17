declare namespace VexElement {
  type Name = 'options' | 'tabstave';
  type Param = { key: string, value: string }
  type Command = 'bar' | 'tuplet' | 'annotations' | 'rest' | 'command';
  type Token = any;
  
  interface Element {
    element: Name;
  }
  
  interface Text {
    text: string;
  }
  
  interface Note {
    time?: string;
    dot?: boolean;
    command?: Command;
    type?: string;
    chord?: Array<{fret: string, string: string, decorator?: string}>;
    fret?: string;
    decorator?: string;
    string?: string;
    articulation?: string;
  }

  interface Options extends Element {
    params: Array<Param>
  }

  interface TabStave extends Element {
    notes: Array<Note>;
    options: Array<Options>;
    text: Array<Text>
  }
}

export { VexElement };
