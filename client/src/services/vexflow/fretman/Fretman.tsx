import { VexPlayer } from 'services/vexflow';
import { flatMap, compact } from 'lodash';

class Fretman {
  lit: Array<any> = [];
  pressed: Array<any> = [];
  markers: any = { strings: { } };
  strings: any = { };

  addMarker(markerComponent: any): void {
    const { string, fret } = markerComponent.props;

    this.markers.strings[string] = this.markers.strings[string] || { frets: { } };
    this.markers.strings[string].frets[fret] = this.markers.strings[string].frets[fret] || { };
    this.markers.strings[string].frets[fret] = markerComponent;
  }

  addString(stringComponent: any): void {
    this.strings[stringComponent.props.string] = stringComponent;
  }

  reset(): void {
    this.lit.forEach(component => component.unlight());
    this.pressed.forEach(component => component.unpress());
    this.lit = [];
    this.pressed = [];
    this.markers = { strings: { } };
    this.strings = { };
  }

  updateWithPlayer(player: VexPlayer): void {
    if (!player.scrollSpec) {
      this.lit.forEach(component => component.unlight());
      this.pressed.forEach(component => component.unpress());
      return;
    }

    const shouldLightMarkers = compact(
      player.scrollSpec.lowTick.lit.map(pos => (
        this.markerAt(parseInt(pos.str, 10), parseInt(pos.fret, 10))
      ))
    );

    const shouldPressMarkers = compact(
      player.scrollSpec.lowTick.pressed.map(pos => (
        this.markerAt(parseInt(pos.str, 10), parseInt(pos.fret, 10))
      ))
    );

    const shouldLightStrings = compact(
      player.scrollSpec.lowTick.pressed.map(pos => (
        this.strings[parseInt(pos.str, 10)]
      ))
    );

    this.lit.forEach(component => component.unlight());
    this.pressed.forEach(component => component.unpress());

    shouldLightMarkers.forEach(marker => marker && marker.light());
    shouldLightStrings.forEach(string => string && string.light());
    shouldPressMarkers.forEach(marker => marker && marker.press());

    this.lit = [...shouldLightMarkers, ...shouldLightStrings];
    this.pressed = shouldPressMarkers;
  }

  updateWithScaleVisualizer(scaleVisualizer: any): void {
    const { positionsByNote, litNotes, pressedNotes } = scaleVisualizer;

    const shouldLightMarkers = flatMap(Array.from(litNotes), note => (
      positionsByNote[note].map(pos => this.markerAt(pos.string, pos.fret))
    ));

    const shouldPressMarkers = flatMap(Array.from(pressedNotes), note => (
      positionsByNote[note].map(pos => this.markerAt(pos.string, pos.fret))
    ));

    const shouldLightMarkersSet = new Set(shouldLightMarkers);
    const shouldUnlightMarkers = this.lit.filter(comp => (
      !shouldLightMarkersSet.has(comp)
    ));

    const shouldPressMarkersSet = new Set(shouldPressMarkers);
    const shouldUnpressMarkers = this.pressed.filter(comp => (
      !shouldPressMarkersSet.has(comp)
    ));

    shouldUnlightMarkers.forEach(component => component.unlight());
    shouldUnpressMarkers.forEach(component => component.unpress());

    shouldLightMarkers.forEach(marker => marker.light());
    shouldPressMarkers.forEach(marker => marker.press());

    this.lit = shouldLightMarkers;
    this.pressed = shouldPressMarkers;
  }

  private markerAt (string: number, fret: number): any {
    return this.markers.strings[string].frets[fret];
  }
}

export default Fretman;
