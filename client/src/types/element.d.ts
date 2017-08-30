type Param = { key: string, value: string }

declare namespace Element {
  type Name = 'options' | 'tabstave';

  interface Element {
    element: Name;
  }

  interface Options extends Element {
    params: Array<Param>
  }

  interface TabStave extends Element {
    notes: Array<any>;
    options: Array<Options>;
  }

  interface Token extends Object {

  }
}

export { Element, Param };
