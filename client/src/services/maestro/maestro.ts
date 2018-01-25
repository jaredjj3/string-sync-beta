import { Flow } from 'vexflow';
import { Snapshot, SnapshotFactory } from './';
import { Tab, Fretboard, TimeKeeper } from 'services';

// The purpose of this service is to coordinate a video player's state (i.e. isActive and
// current time states) with DOM elements or other services. Its role is distinct from the
// RAFLoop singleton in a sense that there can be consumers that do not require knowledge
// of a video player's state. It is up to the caller to update the maestro's currentTime
// attribute. Maestro will apply the deadTimeMs to the currentTimeMs when executing each
// plan in the plans object.
class Maestro {
  tab: Tab = null;
  fretboard: Fretboard = null;
  isActive: boolean = false;
  updateQueued: boolean = false;
  showMoreNotes: boolean = false;

  timeKeeper: TimeKeeper = null;
  loopTimeKeepers: Array<TimeKeeper> = [];
  
  private _bpm: number = 0;
  private _currentTimeMs: number = 0;
  private _deadTimeMs: number = 0;
  private _snapshot: Snapshot = new Snapshot();

  set bpm(bpm: number) {
    this._bpm = bpm;
    this.timeKeeper = new TimeKeeper(this.tpm);
    this._syncMaestroTimeKeeper();
  }

  set currentTimeMs(currentTimeMs: number) {
    this._currentTimeMs = currentTimeMs;
    this._syncMaestroTimeKeeper();
  }

  set deadTimeMs(deadTimeMs: number) {
    this._deadTimeMs = deadTimeMs;
    this._syncMaestroTimeKeeper();
  }

  get bpm(): number {
    return this._bpm;
  }

  get currentTimeMs(): number {
    return this._currentTimeMs;
  }

  get snapshot(): Snapshot {
    return this._snapshot;
  }

  get tpm(): number {
    return this.bpm * (Flow.RESOLUTION / 4);
  }

  get offsetTimeMs(): number {
    return this.timeKeeper.timeMs;
  }

  get offsetTick(): number {
    return this.timeKeeper.tick;
  }

  reset(): Maestro {
    this.tab = null;
    this.fretboard = null;
    this.isActive = false;
    this.updateQueued = false;
    this.showMoreNotes = false;

    this.timeKeeper = null;
    this.loopTimeKeepers = [];

    this.bpm = 0;
    this.currentTimeMs = 0;
    this.deadTimeMs = 0;
    this._snapshot = new Snapshot();

    return this;
  }

  update(): Snapshot {
    if (this._shouldUpdate()) {
      this._snapshot = SnapshotFactory.create({
        prevSnapshot: this._snapshot,
        tab: this.tab,
        tuning: this.fretboard.tuning,
        tick: this.offsetTick,
        timeMs: this.offsetTimeMs,
        showMoreNotes: this.showMoreNotes,
        loopTimeKeepers: this.loopTimeKeepers
      });
      this.updateQueued = false;
    }

    return this.snapshot;
  }

  queueUpdate(): Maestro {
    this.updateQueued = true;
    return this;
  }

  private _syncMaestroTimeKeeper(): TimeKeeper {
    this.timeKeeper.timeMs = this.currentTimeMs + this.deadTimeMs;
    return this.timeKeeper;
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
