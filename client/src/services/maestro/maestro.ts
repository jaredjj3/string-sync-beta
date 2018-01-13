import { Flow } from 'vexflow';
import { toTick } from 'ssUtil';
import { Snapshot, SnapshotFactory } from './';
import { Tab, Fretboard } from 'services';

// The purpose of this service is to coordinate a video player's state (i.e. isActive and
// current time states) with DOM elements or other services. Its role is distinct from the
// RAFLoop singleton in a sense that there can be consumers that do not require knowledge
// of a video player's state. It is up to the caller to update the maestro's currentTime
// attribute. Maestro will apply the deadTimeMs to the currentTimeMs when executing each
// plan in the plans object.
class Maestro {
  tab: Tab = null;
  fretboard: Fretboard = null;

  currentTimeMs: number = 0;
  bpm: number = 0;
  deadTimeMs: number = 0;

  isActive: boolean = false;
  updateQueued: boolean = false;

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

  reset(): Maestro {
    this.tab = null;
    this.fretboard = null;
    this.currentTimeMs = 0;
    this.bpm = 0;
    this.deadTimeMs = 0;
    this.isActive = false;
    this.updateQueued = false;
    this._snapshot = new Snapshot();

    return this;
  }

  update(): Snapshot {
    if (this._shouldUpdate()) {
      this._snapshot = SnapshotFactory.create(
        this._snapshot,
        this.tab,
        this.offsetTick,
        this.offsetTimeMs
      );
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

const instance = new Maestro();

export default instance;
