import { Snapshot } from './';
import { Tab, Tuning, Line, Measure, Note } from 'services';
import { flatMap, uniqWith, uniq, isEqual } from 'lodash';
import { Flow } from 'vexflow';
import { isBetween, interpolator, elvis } from 'ssUtil';

class SnapshotFactory {
  static create(prevSnapshot: Snapshot, tab: Tab, tuning: Tuning, tick: number, timeMs: number, showAllMeasureNotes: boolean): Snapshot {
    const snapshot = new Snapshot(prevSnapshot || null);

    const { line, measure, note } = SnapshotFactory._getCurrentTabElements(tab, tick);
    const { press, justPress } = SnapshotFactory._getPressPositions(note, tick)
    const light = SnapshotFactory._getLightPositions(note, press, tuning, showAllMeasureNotes);
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

  private static _getPressPositions(note: Note, tick: number): any {
    let press = null;
    let justPress = null;

    if (note) {
      press = note.getGuitarPos();

      const { tickRange } = note;
      const threshold = Math.min(...[
        tickRange.start + 250,
        tickRange.start + ((tickRange.stop - tickRange.start) * 0.50)
      ]);
      if (tick < threshold) {
        justPress = note.getGuitarPos();
      }
    }

    return {
      press,
      justPress
    }
  }

  private static _getLightPositions(note: Note, pressedPositions: any, tuning: Tuning, showAllMeasureNotes: boolean): any {
    let light = null;

    // TODO: Consider factoring in octaves for these calculations.
    if (showAllMeasureNotes) {
      const noteNames = flatMap(note.measure.notes, measureNote => (
        measureNote.staveNote.keys.map(noteNameWithOctave => (
          noteNameWithOctave.split('/')[0].toUpperCase()
        ))
      ));
      const lightNotes = uniq(noteNames).filter(noteName => noteName !== 'R');
      light = flatMap(lightNotes, lightNote => tuning.getGuitarPositions(lightNote));
    } else {
      light = flatMap(note.measure.notes, note => note.getGuitarPos());
      light = uniqWith(light, isEqual);
    }

    return light;
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
