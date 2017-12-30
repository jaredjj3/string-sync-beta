import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';
import FretboardPlan from './FretboardPlan';
import TabPlan from './TabPlan';

interface MaestroPlans {
  fretboardPlan: FretboardPlan;
  tabPlan: TabPlan;
}

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
  plans: MaestroPlans = {
    fretboardPlan: null,
    tabPlan: null
  };

  bpm: number = 0;
  deadTimeMs: number = 0;

  isMediaActive: boolean = false;
  currentTimeMs: number = 0;

  get tpm(): number {
    return this.bpm * (Flow.RESOLUTION / 4);
  }

  get currentTick(): number {
    return toTick(this.currentTimeMs, this.tpm);
  }

  conduct(): Maestro {
    const missingPlans = [];
    Object.keys(this.plans).forEach(planName => {
      const plan = this.plans[planName];
      if (!plan) {
        missingPlans.push(planName);
      }
    });

    if (missingPlans.length > 0) {
      throw new Error(`missing plans: ${missingPlans.join(', ')}`);
    }

    const tabPlan = this._executeTabPlan();
    const fretboardPlan = this._executeFretboardPlan();

    this.plans = {
      tabPlan,
      fretboardPlan
    };

    return this;
  }

  private _executeTabPlan(): TabPlan {
    return this.plans.tabPlan.execute(this.isMediaActive, this.currentTimeMs, this.currentTick);
  }

  private _executeFretboardPlan(): FretboardPlan {
    return this.plans.fretboardPlan.execute(this.isMediaActive, this.currentTimeMs, this.currentTick);
  }
}

export default Maestro;
