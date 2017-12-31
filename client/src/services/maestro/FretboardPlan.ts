import { Fretboard, Note } from 'services';
import { flatMap, uniqWith, uniqBy, isEqual } from 'lodash';

class FretboardPlan {
  execution: PlanExecutions.Fretboard = {
    lightPos: [],
    pressPos: [],
    currentNote: null
  }
  fretboard: Fretboard = null;

  constructor(fretboard: Fretboard) {
    this.fretboard = fretboard;
  }

  execute(currentNote: Note): FretboardPlan {
    if (currentNote === this.execution.currentNote) {
      return this;
    }

    let lightPos = [];
    let pressPos = [];

    if (currentNote !== null) {
      pressPos = currentNote.getGuitarPos();
      lightPos = flatMap(currentNote.measure.notes, note => note.getGuitarPos());
      lightPos = uniqWith(lightPos, isEqual);
    }

    this.execution = {
      lightPos,
      pressPos,
      currentNote
    };

    return this;
  }
}

export default FretboardPlan;
