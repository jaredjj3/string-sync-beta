class PianoKey {
  note: string;
  props: any;

  constructor(note: string, props: any) {
    this.note = note;
    this.props = props;
  }

  hide(): PianoKey {
    this.unpress().unlight();
    return this;
  }

  unlight(): PianoKey {
    this.props.setLit(false);
    return this;
  }

  light(): PianoKey {
    this.props.setLit(true);
    return this;
  }

  press(): PianoKey {
    this.props.setPressed(true);
    return this;
  }

  unpress(): PianoKey {
    this.props.setPressed(false);
    return this;
  }

  justPress(): PianoKey {
    this.props.setJustPressed(true);
    return this;
  }

  unJustPress(): PianoKey {
    this.props.setJustPressed(false);
    return this;
  }
}

export default PianoKey;
