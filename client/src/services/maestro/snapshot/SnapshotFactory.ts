import { Snapshot } from './';
import { Tab, Tuning, Line, Measure, Note } from 'services';
import { flatMap, uniqWith, uniq, isEqual, startsWith } from 'lodash';
import { Flow } from 'vexflow';
import { isBetween, interpolator, elvis } from 'ssUtil';

interface SnapshotFactoryAttributes {
  prevSnapshot: Snapshot,
  tab: Tab,
  tuning: Tuning,
  tick: number,
  timeMs: number,
  showMoreNotes: boolean,
  loopTick: Array<number>
}

class SnapshotFactory {
  static create(attrs: SnapshotFactoryAttributes): Snapshot {
    const {
      prevSnapshot,
      tab,
      tuning,
      tick,
      timeMs,
      showMoreNotes,
      loopTick
    } = attrs;

    const snapshot = new Snapshot(prevSnapshot || null);

    const { line, measure, note } = SnapshotFactory._getCurrentTabElements(tab, tick);
    const { press, justPress } = SnapshotFactory._getPressPositions(note, tick)
    const light = SnapshotFactory._getLightPositions(note, press, tuning, showMoreNotes);
    const interpolator = SnapshotFactory._getInterpolator(note);
    const loopData = SnapshotFactory._getLoopData(loopTick, tab);
    const isLoopScrubbing = Boolean(prevSnapshot && !isEqual(prevSnapshot.data.loopTick, loopTick));

    snapshot.setData({
      tick,
      timeMs,
      line,
      measure,
      note,
      light,
      justPress,
      press,
      interpolator,
      loopData,
      loopTick,
      isLoopScrubbing
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

  private static _getLightPositions(note: Note, pressedPositions: any, tuning: Tuning, showMoreNotes: boolean): any {
    let light = null;

    if (note) {
      if (showMoreNotes) {
        const noteNames = flatMap(note.measure.notes, measureNote => measureNote.staveNote.keys);
        const lightNotes = uniq(noteNames).filter(noteName => !startsWith(noteName.toUpperCase(), 'R'));
        light = flatMap(lightNotes, lightNote => tuning.getGuitarPositions(lightNote));
      } else {
        light = flatMap(note.measure.notes, note => note.getGuitarPos());
        light = uniqWith(light, isEqual);
      }  
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

  private static _getLoopData(loopTick: Array<number>, tab: Tab): any { 
    return loopTick.sort().map(tick => {
      const { line, note } = SnapshotFactory._getCurrentTabElements(tab, tick);
      const interpolator = SnapshotFactory._getInterpolator(note);

      return {
        line,
        interpolator
      }
    });
  }
}

export default SnapshotFactory;
