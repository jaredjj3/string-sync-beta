import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';
import { Snapshot, SnapshotFactory } from './';
import { Tab, Fretboard, Piano, Tuning } from 'services';

// The purpose of this service is to coordinate a video player's state (i.e. isActive and
// current time states) with DOM elements or other services. Its role is distinct from the
// RAFLoop singleton in a sense that there can be consumers that do not require knowledge
// of a video player's state. It is up to the caller to update the maestro's currentTime
// attribute. Maestro will apply the deadTimeMs to the currentTimeMs when executing each
// plan in the plans object.
class Maestro {
  // refs
  tab: Tab = null;
  fretboard: Fretboard = new Fretboard();
  tuning: Tuning = Tuning.get('standard');
  piano: Piano = new Piano();

  // state
  currentTimeMs: number = 0;
  bpm: number = 0;
  deadTimeMs: number = 0;
  loopMs: Array<number> = [];
  isActive: boolean = false;
  updateQueued: boolean = false;

  // options
  options: Maestro.Options = {
    showMoreNotes: false,
    showLoop: false,
    autoScroll: true
  }

  // react props
  fretboardProps: any = null;
  pianoProps: any = null;
  notationShowTabProps: any = null;
  scoreScrollerProps: any = null;
  notationShowProps: any = null;

  private _snapshot: Snapshot = new Snapshot();

  get snapshot(): Snapshot {
    return this._snapshot;
  }

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

  update(): Snapshot {
    if (this._shouldUpdate()) {
      const refs = {
        prevSnapshot: this._snapshot,
        tab: this.tab,
        tuning: this.tuning
      };

      const timeData = {
        tick: this.offsetTick,
        timeMs: this.offsetTimeMs,
        loopTick: this.loopMs.map(timeMs => toTick(timeMs, this.tpm))
      };

      const options = Object.assign({}, this.options);

      const factory = new SnapshotFactory(refs, timeData, options);
      this._snapshot = factory.create();
      this.updateQueued = false;
    }

    return this.snapshot;
  }

  queueUpdate(): Maestro {
    this.updateQueued = true;
    return this;
  }

  private _shouldUpdate(): boolean {
    const canUpdate = (
      this.tab &&
      this.fretboard &&
      this.bpm > 0
    );

    return canUpdate && (this.updateQueued || this.isActive);
  }
}

export default Maestro;
