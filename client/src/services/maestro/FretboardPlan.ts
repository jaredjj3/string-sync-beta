import { Fretboard } from 'services';

class FretboardPlan {
  execution: any = null;
  fretboard: Fretboard = null;

  constructor(fretboard: Fretboard) {
    this.fretboard = fretboard;
  }

  execute(currentTick: number): FretboardPlan {
    return this;
  }
}

export default FretboardPlan;
