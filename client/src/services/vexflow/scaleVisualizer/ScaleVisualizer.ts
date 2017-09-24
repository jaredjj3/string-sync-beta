import Fretman from 'services/vexflow/fretman';
import Frets from 'comp/fretboard/frets';

const NULL_STRING_NOTES = Array(Frets.DOTS.length).fill(null);

type Tuning = Array<string>;

class ScaleVisualizer {
  static DEFAULT_TUNING: Tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  static NOTES: Array<string> = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

  positionsByNote: any = null;
  fretman: Fretman = null;
  lit: Set<string> = new Set();
  pressed: Set<string> = new Set();

  private _tuning: Tuning = null;

  constructor(fretman: Fretman, tuning: Tuning = ScaleVisualizer.DEFAULT_TUNING) {
    this.fretman = fretman;
    this.tuning = tuning;
  }

  set tuning(tuning: Tuning) {
    this._tuning = tuning;
    this._updatePositionsByNote();
  }

  get tuning(): Tuning {
    return this._tuning;
  }

  light(note: string): void {
    this._validateNote(note);
    this.lit.add(note);
    this.fretman.updateWithScaleVisualizer(this);
  }

  unlight(note: string): void {
    this._validateNote(note);
    this.lit.delete(note);
    this.fretman.updateWithScaleVisualizer(this);
  }

  togglePress(note: string): void {
    this._validateNote(note);

    if (this.pressed.has(note)) {
      this.pressed.delete(note);
    } else {
      this.pressed.add(note);
    }

    this.fretman.updateWithScaleVisualizer(this);
  }

  private _validateNote(note: string): void {
    const { NOTES } = ScaleVisualizer;

    if (!NOTES.includes(note)) {
      throw new TypeError(`expected note ${note} to be in ${NOTES.join(',')}`);
    }
  }

  private _updatePositionsByNote(): ScaleVisualizer {
    const { NOTES } = ScaleVisualizer;

    const fretboardNotes: Array<Array<string>> = this._tuning.map((stringNote, stringIndex) => {
      const noteIndex = NOTES.indexOf(stringNote);
      return NULL_STRING_NOTES.map((_, fretNum) => (
        NOTES[(noteIndex + fretNum) % NOTES.length]
      ));
    }).reverse();

    this.positionsByNote = fretboardNotes.reduce((positionsByNote, noteArray, stringIndex) => {
      const string = stringIndex + 1;
      noteArray.forEach((note, fret) => {
        positionsByNote[note] = positionsByNote[note] || [];
        positionsByNote[note].push({ string, fret });
      });

      return positionsByNote;
    }, {});

    return this;
  }
}

export default ScaleVisualizer;
