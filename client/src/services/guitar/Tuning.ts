import * as constants from './guitarConstants';
import { uniq } from 'lodash';
import { TUNING_BASE_NOTES_BY_TUNING_NAME } from './guitarConstants';

const DOTS_LENGTH = 23;

const getEmptyNotes = () => [
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null),
  new Array(DOTS_LENGTH).fill(null)
];

// This class contains the logic related to going from a note to a position (fret and string)
// on a fretboard
class Tuning {
  static NOTES: Array<string> = constants.NOTES;
  static ALT_FLAT_NOTE_NAMES: any = constants.ALT_FLAT_NOTE_NAMES;
  static ALT_SHARP_NOTE_NAMES: any = constants.ALT_SHARP_NOTE_NAMES;
  static VALID_NOTES: Set<string> = new Set(constants.VALID_NOTES);

  baseNotes: Array<string> = [];
  notes: Array<Array<string>> = getEmptyNotes();

  static get(tuningName: string): Tuning {
    const baseNotes = constants.TUNING_BASE_NOTES_BY_TUNING_NAME[tuningName];

    if (baseNotes) {
      return new Tuning(baseNotes);
    } else {
      throw new TypeError(
        `expected tuning ${tuningName} to be in ${Object.keys(TUNING_BASE_NOTES_BY_TUNING_NAME)}`
      );
    }
  }

  constructor(baseNotes: Array<string>) {
    this.baseNotes = baseNotes;

    this.setup();
  }

  setup(): Tuning {
    this.notes = this.notes.map((stringNotes, string) => (
      stringNotes.map((_note, fret) => (
        this._noteAt(string, fret)
      ))
    ));

    return this;
  }

  getNote(pos: GuitarPosition): string {
    return this.notes[pos.string][pos.fret];
  }

  getGuitarPositions(note: string): Array<GuitarPosition> {
    if (!Tuning.VALID_NOTES.has(note)) {
      throw new TypeError(`expected note '${note}' to be in ${constants.VALID_NOTES.join(',')}`);
    }

    const altNote = Tuning.ALT_FLAT_NOTE_NAMES[note] || Tuning.ALT_SHARP_NOTE_NAMES[note] || null;
    const guitarPositions: Array<GuitarPosition> = [];

    this.notes.forEach((stringNotes, string) => {
      stringNotes.forEach((_note, fret) => {
        if (note === _note || (altNote && altNote === _note)) {
          guitarPositions.push({ string, fret });
        }
      });
    });

    return guitarPositions;
  }

  // Only should be used for setup(). Consumers of the tuning class should
  // use getNote()
  private _noteAt(string: number, fret: number): string {
    const { NOTES } = Tuning;
    const startNote = this.baseNotes[string];
    const startIndex = NOTES.indexOf(startNote);

    return NOTES[(startIndex + fret) % NOTES.length];
  }
}

export default Tuning;
