type Param = { key: string, value: string }

declare namespace Element {
  type Name = 'options' | 'tabstave';

  interface Element {
    element: Name;
  }

  interface Options extends Element {
    params: Array<Param>
  }

  interface Text {
    text: string;
  }

  interface TabStave extends Element {
    notes: Array<any>;
    options: Array<Options>;
    text: Array<Text>
  }

  type Token = any;
}

export { Element, Param };
