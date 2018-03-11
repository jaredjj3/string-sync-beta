import * as constants from './guitarConstants';
import { uniq, startsWith } from 'lodash';
import { TUNING_BASE_NOTES_BY_TUNING_NAME } from './guitarConstants';
import { Flow } from 'vexflow';

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
  vexflowTuning: Flow.Tuning = null;

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
    this.vexflowTuning = new Flow.Tuning(baseNotes.join(","));

    this.setup();
  }

  setup(): Tuning {
    this.notes = this.notes.map((stringNotes, string) => (
      stringNotes.map((_note, fret) => (
        this.vexflowTuning.getNoteForFret(fret, string + 1)
      ))
    ));

    return this;
  }

  getNote(pos: GuitarPosition): string {
    return this.notes[pos.str][pos.fret];
  }

  getGuitarPositions(note: string, sameOctave = false): Array<GuitarPosition> {
    const guitarPositions: Array<GuitarPosition> = [];

    this.notes.forEach((stringNotes, str) => {
      stringNotes.forEach((_note, fret) => {
        if (!_note || !note) {
          return;
        }

        const srcNote = note.toUpperCase();
        const dstNote = _note.toUpperCase();
        
        const shouldAddNote = sameOctave ? srcNote === dstNote : dstNote.split("/")[0] === srcNote;

        if (shouldAddNote) {
          guitarPositions.push({ str, fret });
        }
      });
    });

    return guitarPositions;
  }
}

export default Tuning;
