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

  update(lightPositions: Array<any>, pressPositions: Array<any>, justPressPositions: Array<any>): Fretboard {
    const lightComps = this.mapComponents(lightPositions, true);
    const pressComps = this.mapComponents(pressPositions, false);
    const justPressComps = this.mapComponents(justPressPositions, true) as Array<FretMarker>;

    const lit = new Set();
    const pressed = new Set();
    const justPressed = new Set();

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

    // Unlight the components not newly pressed nor lit.
    const shouldUnlight = Array.from(this.lit).filter(comp => !lit.has(comp));
    const shouldUnpress = Array.from(this.pressed).filter(comp => !pressed.has(comp));
    const shouldUnjustPress = Array.from(this.justPressed).filter(comp => !justPressed.has(comp));

    shouldUnlight.forEach(comp => comp.unlight());
    shouldUnpress.forEach(comp => comp.unpress());
    shouldUnjustPress.forEach(comp => comp.unJustPress());

    this.lit = lit;
    this.pressed = pressed;
    this.justPressed = justPressed;

    return this;
  }

  mapComponents(positions: Array<GuitarPosition>, markersOnly: boolean): Array<FretboardComponent> {
    const markers = positions.map(pos => this.selectFretMarker(pos.string, pos.fret));

    if (markersOnly) {
      return markers; 
    } else {
      const strings = positions.map(pos => this.selectGuitarString(pos.string));
      return uniq(strings).concat(markers);
    }
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
