import { Flow } from 'vexflow';
import { elvis, toTick, isBetween, interpolator } from 'ssUtil';
import { Snapshot } from './';
import { flatMap, uniqWith, isEqual } from 'lodash';
import { Tab, Fretboard, Note } from 'services';

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
      const snapshot = new Snapshot(this._snapshot);
      const data = this._getSnapshotData();
      snapshot.setData(data);
      this._snapshot = snapshot;
    }

    return this.snapshot;
  }

  private _shouldUpdate(): boolean {
    return Boolean(
      this.tab &&
      this.fretboard &&
      this.bpm > 0
    );
  }

  private _getSnapshotData(): SnapshotData {
    const tick = this.offsetTick;
    const timeMs = this.offsetTimeMs;
    const { line, measure, note } = this._getCurrentTabElements(tick);
    const { light, press } = this._getGuitarPositionsByState(note);
    const interpolator = this._getInterpolator(note);

    return {
      tick,
      timeMs,
      line,
      measure,
      note,
      light,
      press,
      interpolator
    }
  }

  private _getCurrentTabElements(tick: number): any {
    let line = null;
    let measure = null;
    let note = null;

    this.tab.lines.forEach(_line => {
      const lineTickRange = _line.getTickRange();
      if (isBetween(tick, lineTickRange.start, lineTickRange.stop)) {
        line = _line;
        _line.measures.forEach(_measure => {
          const measureTickRange = _measure.getTickRange();
          if (isBetween(tick, measureTickRange.start, measureTickRange.stop)) {
            measure = _measure;
            _measure.notes.forEach(_note => {
              if (isBetween(tick, _note.tickRange.start, _note.tickRange.stop)) {
                note = _note;
              }
            });
          }
        });
      }
    });

    return {
      line,
      measure,
      note
    }
  }

  private _getGuitarPositionsByState(note: Note): any {
    let light = null;
    let press = null;

    if (note) {
      press = note.getGuitarPos();
      light = flatMap(note.measure.notes, note => note.getGuitarPos());
      light = uniqWith(light, isEqual);
    }

    return {
      light,
      press
    }
  }

  private _getInterpolator(note: Note): any {
    if (!note) {
      return interpolator({ x: 0, y: 0 }, { x: 0, y: 0 });
    }

    const posRange = note.getPosXRange();
    const { tickRange } = note;

    const point1 = {
      x: tickRange.start,
      y: posRange.start
    };

    const point2 = {
      x: tickRange.stop,
      y: posRange.start > posRange.stop ? note.staveNote.stave.width : posRange.stop
    };

    return interpolator(point1, point2);
  }
}

const instance = new Maestro();

export default instance;
