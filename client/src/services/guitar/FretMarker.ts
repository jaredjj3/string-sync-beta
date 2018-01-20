class FretMarker {
  string: number = 0;
  fret: number = 0;
  props: any = {};

  constructor(string: number, fret: number, markerProps: any) {
    this.string = string;
    this.fret = fret;
    this.props = markerProps;
  }

  hide(): FretMarker {
    this.unpress().unlight();
    return this;
  }

  unlight(): FretMarker {
    this.props.setLit(false);
    return this;
  }

  light(): FretMarker {
    this.props.setLit(true);
    return this;
  }

  press(): FretMarker {
    this.props.setPressed(true);
    return this;
  }

  unpress(): FretMarker {
    this.props.setPressed(false);
    return this;
  }

  justPress(): FretMarker {
    this.props.setJustPressed(true);
    return this;
  }

  unJustPress(): FretMarker {
    this.props.setJustPressed(false);
    return this;
  }
}

export default FretMarker;
