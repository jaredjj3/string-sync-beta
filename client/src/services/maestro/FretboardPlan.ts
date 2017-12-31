import { Fretboard, Note } from 'services';
import { flatMap, uniqWith, uniqBy, isEqual } from 'lodash';

class FretboardPlan {
  execution: PlanExecutions.Fretboard = {
    lightPos: [],
    pressPos: []
  }
  fretboard: Fretboard = null;

  constructor(fretboard: Fretboard) {
    this.fretboard = fretboard;
  }

  execute(currentNote: Note): FretboardPlan {
    let lightPos = [];
    let pressPos = [];

    if (currentNote !== null) {
      pressPos = currentNote.getGuitarPos();
      lightPos = flatMap(currentNote.measure.notes, note => note.getGuitarPos());
      lightPos = uniqWith(lightPos, isEqual);
    }

    this.execution = {
      lightPos,
      pressPos
    };

    return this;
  }
}

export default FretboardPlan;
