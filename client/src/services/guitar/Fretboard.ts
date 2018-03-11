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
  lit: Set<FretboardComponent> = new Set();
  pressed: Set<FretboardComponent> = new Set();
  justPressed: Set<FretMarker> = new Set();
  suggested: Set<FretMarker> = new Set();

  update(lightPositions: Array<any>, pressPositions: Array<any>, justPressPositions: Array<any>, suggestedPositions: Array<any>): Fretboard {
    const lightComps = this.mapComponents(lightPositions, true);
    const pressComps = this.mapComponents(pressPositions, false);
    const justPressComps = this.mapComponents(justPressPositions, true) as Array<FretMarker>;
    const suggestedComps = this.mapComponents(suggestedPositions, true) as Array<FretMarker>;

    const lit = new Set();
    const pressed = new Set();
    const justPressed = new Set();
    const suggested = new Set();

    lightComps.forEach(comp => {
      if (!this.lit.has(comp)) {
        comp.light();
      }

      lit.add(comp);
    });

    pressComps.forEach(comp => {
      if (!this.pressed.has(comp)) {
        comp.press();
      }

      pressed.add(comp);
    });

    justPressComps.forEach(comp => {
      if (!this.justPressed.has(comp)) {
        comp.justPress();
      }

      justPressed.add(comp);
    })

    suggestedComps.forEach(comp => {
      if (!this.suggested.has(comp)) {
        comp.suggest();
      }

      suggested.add(comp);
    })

    // Unlight the components not newly pressed nor lit.
    const shouldUnlight = Array.from(this.lit).filter(comp => !lit.has(comp));
    const shouldUnpress = Array.from(this.pressed).filter(comp => !pressed.has(comp));
    const shouldUnjustPress = Array.from(this.justPressed).filter(comp => !justPressed.has(comp));
    const shouldUnsuggest = Array.from(this.suggested).filter(comp => !suggested.has(comp));

    shouldUnlight.forEach(comp => comp.unlight());
    shouldUnpress.forEach(comp => comp.unpress());
    shouldUnjustPress.forEach(comp => comp.unJustPress());
    shouldUnsuggest.forEach(comp => comp.unSuggest());

    this.lit = lit;
    this.pressed = pressed;
    this.justPressed = justPressed;
    this.suggested = suggested;

    return this;
  }

  mapComponents(positions: Array<GuitarPosition>, markersOnly: boolean): Array<FretboardComponent> {
    const markers = positions.map(pos => this.selectFretMarker(pos.str, pos.fret));

    if (markersOnly) {
      return markers; 
    } else {
      const strs = positions.map(pos => this.selectGuitarString(pos.str));
      return uniq(strs).concat(markers);
    }
  }

  addFretMarker(str: number, fret: number, markerProps: any): FretMarker {
    const fretMarker = new FretMarker(str, fret, markerProps);
    this.fretMarkers[str][fret] = fretMarker;
    return fretMarker;
  }

  removeFretMarker(str: number, fret: number): Array<Array<FretMarker>> {
    this.fretMarkers[str][fret] = null;
    return this.fretMarkers;
  }

  selectFretMarker(str: number, fret: number): FretMarker {
    return this.fretMarkers[str][fret];
  }

  addGuitarString(str: number, strProps: any): GuitarString {
    const strObj = new GuitarString(str, strProps);
    this.guitarStrings[str] = strObj;
    return strObj;
  }

  removeGuitarString(str: number): Array<GuitarString> {
    this.guitarStrings[str] = null;
    return this.guitarStrings;
  }

  selectGuitarString(str: number): any {
    return this.guitarStrings[str];
  }
}

export default Fretboard;
