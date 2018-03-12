class GuitarString {
  string: number = 0;
  fret: void = null;
  props: any = {};

  constructor(string: number, stringProps: any) {
    this.string = string;
    this.props = stringProps;
  }

  hide(): GuitarString {
    this.unpress().unlight();
    return this;
  }

  unlight(): GuitarString {
    this.props.setLit(false);
    return this;
  }

  light(): GuitarString {
    this.props.setLit(true);
    return this;
  }

  press(): GuitarString {
    this.props.setPressed(true);
    return this;
  }

  unpress(): GuitarString {
    this.props.setPressed(false);
    return this;
  }
}

export default GuitarString;
