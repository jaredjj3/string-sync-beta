import { Snapshot } from './';
import { Tab, Line, Measure, Note } from 'services';
import { flatMap, uniqWith, isEqual } from 'lodash';
import { Flow } from 'vexflow';
import { isBetween, interpolator } from 'ssUtil';

class SnapshotFactory {
  static create(prevSnapshot: Snapshot, tab: Tab, tick: number, timeMs: number): Snapshot {
    const snapshot = new Snapshot(prevSnapshot || null);

    const { line, measure, note } = SnapshotFactory._getCurrentTabElements(tab, tick);
    const { light, press, justPress } = SnapshotFactory._getGuitarPositionsByState(note, tick);
    const interpolator = SnapshotFactory._getInterpolator(note);

    snapshot.setData({
      tick,
      timeMs,
      line,
      measure,
      note,
      light,
      justPress,
      press,
      interpolator
    });

    return snapshot;
  }

  private static _getCurrentTabElements(tab: Tab, tick: number): any {
    let line = null;
    let measure = null;
    let note = null;

    tab.lines.forEach(_line => {
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

  private static _getGuitarPositionsByState(note: Note, tick: number): any {
    let light = null;
    let press = null;
    let justPress = null;

    if (note) {
      press = note.getGuitarPos();

      const delta = tick - note.tickRange.start;
      if (delta < 4800) {
        justPress = note.getGuitarPos();
      }

      light = flatMap(note.measure.notes, note => note.getGuitarPos());
      light = uniqWith(light, isEqual);
    }

    return {
      light,
      press,
      justPress
    }
  }

  private static _getInterpolator(note: Note): any {
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

export default SnapshotFactory;
