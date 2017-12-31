import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';
import FretboardPlan from './FretboardPlan';
import TabPlan from './TabPlan';
import { values } from 'lodash';

// The purpose of this service is to coordinate a video player's state (i.e. isActive and
// current time states) with DOM elements or other services. Its role is distinct from the
// RAFLoop singleton in a sense that there can be consumers that do not require knowledge
// of a video player's state. It is up to the caller to update the maestro's currentTime
// attribute. Maestro will apply the deadTimeMs to the currentTimeMs when executing each
// plan in the plans object.
//
// Another way to think of this class's role is to consider the conduct() function. It takes
// the plans in the plans object, executes each one, and possible pipe the execution of one
// plan to another. The purpose of the plans are to provide plan executions, which can
// be consumed to update the DOM.
class Maestro {
  fretboardPlan: FretboardPlan = null;
  tabPlan: TabPlan = null;

  bpm: number = 0;
  deadTimeMs: number = 0;

  isMediaActive: boolean = false;
  currentTimeMs: number = 0;

  get tpm(): number {
    return this.bpm * (Flow.RESOLUTION / 4);
  }

  get currentTick(): number {
    const tick = toTick(this.currentTimeMs, this.tpm);
    return tick !== tick ? 0 : tick; // guard against NaN
  }

  conduct(): Maestro {
    this._executeTabPlan();
    this._executeFretboardPlan();

    return this;
  }

  private _executeTabPlan(): TabPlan {
    return this.tabPlan ? this.tabPlan.execute(this.currentTick) : null;
  }

  private _executeFretboardPlan(): FretboardPlan {
    if (this.tabPlan && this.tabPlan.execution) {
      const { currentNote } = this.tabPlan.execution;
      return this.fretboardPlan ? this.fretboardPlan.execute(currentNote) : null;
    } else {
      return null;
    }
  }
}

export default Maestro;
