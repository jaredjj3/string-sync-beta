import FretMarker from './FretMarker';
import GuitarString from './GuitarString';
import Tuning from './Tuning';
import { isEqual, uniq } from 'lodash';

const DOTS_LENGTH = 23;

const getEmptyFretMarkers = () => [
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null)
];

const getEmptyStrings = () => new Array(6).fill(null);

type FretboardComponent = FretMarker | GuitarString;

class Fretboard {
  fretMarkers: Array<Array<FretMarker>> = getEmptyFretMarkers();
  guitarStrings: Array<GuitarString> = getEmptyStrings();
  tuning: Tuning = Tuning.get('standard');
  lit: Set<FretboardComponent> = new Set();
  pressed: Set<FretboardComponent> = new Set();

  update(lightPositions: Array<any>, pressPositions: Array<any>): Fretboard {
    const lightComps = this.mapComponents(lightPositions);
    const pressComps = this.mapComponents(pressPositions);

    const lit = new Set();
    const pressed = new Set();

    lightComps.forEach(comp => {
      comp.light();
      lit.add(comp);
    });

    pressComps.forEach(comp => {
      comp.press();
      pressed.add(comp);
    });

    // Unlight the components not newly pressed nor lit.
    const shouldUnlight = Array.from(this.lit).filter(comp => !lit.has(comp));
    const shouldUnpress = Array.from(this.pressed).filter(comp => !pressed.has(comp));

    shouldUnlight.forEach(comp => comp.unlight());
    shouldUnpress.forEach(comp => comp.unpress());

    this.lit = lit;
    this.pressed = pressed;

    return this;
  }

  mapComponents(positions: Array<GuitarPosition>): Array<FretboardComponent> {
    const markers = positions.map(pos => this.selectFretMarker(pos.string, pos.fret));
    const strings = positions.map(pos => this.selectGuitarString(pos.string));

    return uniq(strings).concat(markers);
  }

  addFretMarker(string: number, fret: number, markerProps: any): FretMarker {
    const fretMarker = new FretMarker(string, fret, markerProps);
    this.fretMarkers[string][fret] = fretMarker;
    return fretMarker;
  }

  removeFretMarker(string: number, fret: number): Array<Array<FretMarker>> {
    this.fretMarkers[string][fret] = null;
    return this.fretMarkers;
  }

  selectFretMarker(string: number, fret: number): FretMarker {
    return this.fretMarkers[string][fret];
  }

  addGuitarString(string: number, stringProps: any): GuitarString {
    const stringObj = new GuitarString(string, stringProps);
    this.guitarStrings[string] = stringObj;
    return stringObj;
  }

  removeGuitarString(string: number): Array<GuitarString> {
    this.guitarStrings[string] = null;
    return this.guitarStrings;
  }

  selectGuitarString(string: number): any {
    return this.guitarStrings[string];
  }
}

export default Fretboard;
