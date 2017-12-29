import FretMarker from './FretMarker';
import GuitarString from './GuitarString';

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

  addFretMarker(string: number, fret: number, markerProps: any): FretMarker {
    const fretMarker = new FretMarker(string, fret, markerProps);
    this.fretMarkers[string - 1][fret] = fretMarker;
    return fretMarker;
  }

  removeFretMarker(string: number, fret: number): Array<Array<FretMarker>> {
    this.fretMarkers[string - 1][fret] = null;
    return this.fretMarkers;
  }

  selectFretMarker(string: number, fret: number): FretMarker {
    return this.fretMarkers[string - 1][fret];
  }

  // stringNumber === stringIndex + 1
  addGuitarString(stringNumber: number, stringProps: any): GuitarString {
    const string = new GuitarString(stringNumber, stringProps);
    this.guitarStrings[stringNumber - 1] = string;
    return string;
  }

  removeGuitarString(stringNumber: number): Array<GuitarString> {
    this.guitarStrings[stringNumber - 1] = null;
    return this.guitarStrings;
  }

  selectGuitarString(stringNumber: number): any {
    return this.guitarStrings[stringNumber - 1];
  }
}

export default Fretboard;
