import FretMarker from './FretMarker';
import GuitarString from './GuitarString';
import Tuning from './Tuning';

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

class Fretboard {
  fretMarkers: Array<Array<FretMarker>> = getEmptyFretMarkers();
  guitarStrings: Array<GuitarString> = getEmptyStrings();
  tuning: Tuning = Tuning.get('standard');

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
