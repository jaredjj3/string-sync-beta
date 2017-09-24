import Fretman from 'services/vexflow/fretman';
import Frets from 'comp/fretboard/frets';

const NULL_STRING_NOTES = Array(Frets.DOTS.length).fill(null);

type Tuning = Array<string>;

interface Position {
  string: number;
  fret: number;
}

class ScaleVisualizer {
  static DEFAULT_TUNING: Tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  static NOTES: Array<string> = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

  positionsByNote: any = null;
  fretman: Fretman = null;
  litNotes: Set<string> = new Set();
  pressedNotes: Set<string> = new Set();

  private _tuning: Tuning = null;

  constructor(fretman: Fretman, tuning: Tuning = ScaleVisualizer.DEFAULT_TUNING) {
    this.fretman = fretman;
    this.tuning = tuning;
  }

  set tuning(tuning: Tuning) {
    this._tuning = tuning;
    this._updatePositionsByNote();
    this.fretman.updateWithScaleVisualizer(this);
  }

  get tuning(): Tuning {
    return Object.assign([], this._tuning);
  }

  afterUpdate = (scaleVisualizer: ScaleVisualizer) => {
    // noop
  }

  noteAt(pos: Position): string {
    const { NOTES } = ScaleVisualizer;

    const startNote = this.tuning.reverse()[pos.string - 1];
    const startIndex = NOTES.indexOf(startNote);

    return NOTES[(startIndex + pos.fret) % NOTES.length];
  }

  light(note: string): void {
    this._validateNote(note);
    this.litNotes.add(note);
    this.fretman.updateWithScaleVisualizer(this);

    this.afterUpdate(this);
  }

  unlight(note: string): void {
    this._validateNote(note);
    this.litNotes.delete(note);
    this.fretman.updateWithScaleVisualizer(this);

    this.afterUpdate(this);
  }

  togglePress(note: string): void {
    this._validateNote(note);

    if (this.pressedNotes.has(note)) {
      this.pressedNotes.delete(note);
    } else {
      this.pressedNotes.add(note);
    }

    this.fretman.updateWithScaleVisualizer(this);

    this.afterUpdate(this);
  }

  private _validateNote(note: string): void {
    const { NOTES } = ScaleVisualizer;

    if (!NOTES.includes(note)) {
      throw new TypeError(`expected note ${note} to be in ${NOTES.join(',')}`);
    }
  }

  private _updatePositionsByNote(): ScaleVisualizer {
    const { NOTES } = ScaleVisualizer;

    const fretboardNotes: Array<Array<string>> = this.tuning.reverse().map(stringNote => {
      const noteIndex = NOTES.indexOf(stringNote);
      return NULL_STRING_NOTES.map((_, fretNum) => (
        NOTES[(noteIndex + fretNum) % NOTES.length]
      ));
    });

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
