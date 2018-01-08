import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';
import { values } from 'lodash';
import FretboardPlan from './FretboardPlan';
import TabPlan from './TabPlan';
import CaretPlan from './CaretPlan';
import ScrollPlan from './ScrollPlan';

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
  caretPlan: CaretPlan = null;
  scrollPlan: ScrollPlan = null;

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

  get offsetTimeMs(): number {
    return this.currentTimeMs - this.deadTimeMs;
  }

  get offsetTick(): number {
    const offset = toTick(this.deadTimeMs, this.tpm);
    return offset !== offset ? 0 : this.currentTick - offset; // guard against NaN
  }

  conduct(): Maestro {
    this._executeTabPlan();
    this._executeFretboardPlan();
    this._executeCaretPlan();
    this._executeScrollPlan();

    return this;
  }

  private _executeTabPlan(): boolean {
    const shouldExecute = (
      this.tabPlan &&
      this.tabPlan.tab &&
      !this.tabPlan.tab.error
    )

    if (shouldExecute) {
      this.tabPlan.execute(this.offsetTick);
    }

    return !!this.tabPlan;
  }

  private _executeFretboardPlan(): boolean {
    const shouldExecute = (
      this.tabPlan &&
      this.tabPlan.execution &&
      this.fretboardPlan
    );

    if (shouldExecute) {
      const { currentNote } = this.tabPlan.execution;
      this.fretboardPlan.execute(currentNote);
    }

    return !!shouldExecute;
  }

  private _executeCaretPlan(): boolean {
    const shouldExecute = (
      this.caretPlan &&
      this.tabPlan &&
      this.tabPlan.execution.currentNote &&
      this.tabPlan.execution.currentLine
    );

    if (shouldExecute) {
      const { currentNote, currentLine } = this.tabPlan.execution;
      this.caretPlan.execute(this.offsetTick, currentNote, currentLine);
    }

    return !!shouldExecute;
  }

  private _executeScrollPlan(): boolean {
    if (this.scrollPlan) {
      this.scrollPlan.execute(this.tabPlan.execution.currentLine);
    }

    return !!this.scrollPlan;
  }
}

export default Maestro;
