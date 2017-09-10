import Player from '../player';

class Fretman {
  lit: Array<any> = [];
  pressed: Array<any> = [];
  markers: any = { strings: { } };
  strings: any = { };

  addMarker (markerComponent: any): void {
    const { string, fret } = markerComponent.props;

    this.markers.strings[string] = this.markers.strings[string] || { frets: { } };
    this.markers.strings[string].frets[fret] = this.markers.strings[string].frets[fret] || { };
    this.markers.strings[string].frets[fret] = markerComponent;
  }

  addString (stringComponent: any): void {
    this.strings[stringComponent.props.string] = stringComponent;
  }

  updateWithPlayer(player: Player): void {
    const shouldLightMarkers = player.currTick.lit.map(pos => (
      this.markerAt(parseInt(pos.str, 10), parseInt(pos.fret, 10))
    ));

    const shouldPressMarkers = player.currTick.pressed.map(pos => (
      this.markerAt(parseInt(pos.str, 10), parseInt(pos.fret, 10))
    ));

    const shouldLightStrings = player.currTick.pressed.map(pos => (
      this.strings[parseInt(pos.str, 10)]
    ));

    this.lit.forEach(component => component.unlight());
    this.pressed.forEach(component => component.unpress());

    shouldLightMarkers.forEach(marker => marker.light());
    shouldLightStrings.forEach(string => string.light());
    shouldPressMarkers.forEach(marker => marker.press());

    this.lit = [...shouldLightMarkers, ...shouldLightStrings];
    this.pressed = shouldPressMarkers;
  }

  private markerAt (string: number, fret: number): any {
    return this.markers.strings[string].frets[fret];
  }
}

export default Fretman;
