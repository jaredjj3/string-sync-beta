class FretMarker {
  string: number = 0;
  fret: number = 0;
  props: any = {};

  constructor(string: number, fret: number, markerProps: any) {
    this.string = string;
    this.fret = fret;
    this.props = markerProps;
  }
}

export default FretMarker;
