import Fretman from 'services/vexflow/fretman';
import Frets from 'comp/fretboard/frets';

const NULL_STRING_NOTES = Array(Frets.DOTS.length).fill(null);

type Tuning = Array<string>;

class ScaleVisualizer {
  static DEFAULT_TUNING: Tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  static NOTES: Array<string> = ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G'];

  positionsByNote: any = null;
  fretman: Fretman = null;

  private _tuning: Tuning = null;

  constructor(fretman: Fretman, tuning: Tuning = ScaleVisualizer.DEFAULT_TUNING) {
    this.fretman = fretman;
    this._tuning = tuning;
  }

  set tuning(tuning: Tuning) {
    this._tuning = tuning;
    this._updatePositionsByNote();
  }

  get tuning(): Tuning {
    return this._tuning;
  }

  private _updatePositionsByNote(): ScaleVisualizer {
    const { NOTES } = ScaleVisualizer;

    const fretboardNotes: Array<Array<string>> = this._tuning.map((stringNote, stringIndex) => {
      const noteIndex = NOTES.indexOf(stringNote);
      return NULL_STRING_NOTES.map((_, fretNum) => (
        NOTES[(noteIndex + fretNum) % NOTES.length]
      ));
    });

    debugger

    // this.positionsByNote = fretboardNotes.reduce((positionsByNote, noteArray, stringIndex) => {
    //   noteArray.forEach(note)
    //   return positionsByNote;
    // }, {});

    return this;
  }
}

export default ScaleVisualizer;
