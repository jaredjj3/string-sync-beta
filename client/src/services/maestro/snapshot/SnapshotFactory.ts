import { Snapshot } from './';
import { Tab, Tuning, Line, Measure, Note } from 'services';
import { flatMap, uniqWith, uniq, isEqual, startsWith, get } from 'lodash';
import { Flow } from 'vexflow';
import { isBetween, interpolator } from 'ssUtil';

interface SFRefs {
  prevSnapshot: any;
  tab: any;
  tuning: any;
}

interface SFTimeData {
  tick: number;
  timeMs: number;
  loopTick: Array<number>;
}

interface SFOptions {
  showMoreNotes: boolean;
}

class SnapshotFactory {
  // attrs set from the constructor
  prevSnapshot: Snapshot;
  tab: Tab;
  tick: number;
  timeMs: number;
  loopTick: Array<number>;
  showMoreNotes: boolean;
  tuning: Tuning;

  // computed attrs
  line: Line;
  measure: Measure;
  note: Note;
  light: Array<any>;
  justPress: Array<any>;
  press: Array<any>;
  interpolator: Function;
  loopData: any;
  isLoopScrubbing: boolean;

  static getCurrentNote(tab: Tab, tick: number): Note {
    let currentNote = null;

    tab.lines.forEach(line => {
      const lineTickRange = line.getTickRange();
      if (isBetween(tick, lineTickRange.start, lineTickRange.stop)) {
        line.measures.forEach(measure => {
          const measureTickRange = measure.getTickRange();
          if (isBetween(tick, measureTickRange.start, measureTickRange.stop)) {
            measure.notes.forEach(note => {
              if (isBetween(tick, note.tickRange.start, note.tickRange.stop)) {
                currentNote = note;
              }
            });
          }
        });
      }
    });

    return currentNote;
  }

  static getNoteInterpolator(note: Note): Function {
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

  constructor(refs: SFRefs, timeData: SFTimeData, options: SFOptions) {
    this.prevSnapshot = refs.prevSnapshot;
    this.tab = refs.tab;
    this.tuning = refs.tuning;
    
    this.tick     = timeData.tick;
    this.timeMs   = timeData.timeMs;
    this.loopTick = timeData.loopTick;

    this.showMoreNotes = options.showMoreNotes;
  }

  create(): Snapshot {
    const snapshot = new Snapshot(this.prevSnapshot || null);
    snapshot.setData(this._getSnapshotData());
    return snapshot;
  }

  private _getSnapshotData(): any {
    this._doSnapshot();

    return {
      tick:            this.tick,
      timeMs:          this.timeMs,
      line:            this.line,
      measure:         this.measure,
      note:            this.note,
      light:           this.light,
      justPress:       this.justPress,
      press:           this.press,
      interpolator:    this.interpolator,
      loopData:        this.loopData,
      loopTick:        this.loopTick,
      isLoopScrubbing: this.isLoopScrubbing
    };
  }

  private _doSnapshot(): void {
    this._snapshotTabElements();
    this._snapshotPressPositions();
    this._snapshotLightPositions();
    this._snapshotInterpolator();
    this._snapshotLoopData();
    this._snapshotIsLoopScrubbing();
  }

  private _snapshotTabElements(): void {
    this.note = SnapshotFactory.getCurrentNote(this.tab, this.tick);
    this.measure = get(this.note, 'measure', null);
    this.line = get(this.measure, 'line', null);
  }

  private _snapshotPressPositions(): void {
    if (this.note) {
      this.press = this.note.getGuitarPos();

      // Compute a threshold that would be considered for "justPressed" positions
      const { tickRange } = this.note;
      const threshold = Math.min(...[
        tickRange.start + 250,
        tickRange.start + ((tickRange.stop - tickRange.start) * 0.50)
      ]);

      if (this.tick < threshold) {
        this.justPress = this.note.getGuitarPos();
      }
    }
  }

  private _snapshotLightPositions(): void {
    if (this.note) {
      if (this.showMoreNotes) {
        const noteNames = flatMap(this.note.measure.notes, measureNote => measureNote.staveNote.keys);
        const lightNotes = uniq(noteNames).filter(noteName => !startsWith(noteName.toUpperCase(), 'R'));
        this.light = flatMap(lightNotes, lightNote => this.tuning.getGuitarPositions(lightNote));
      } else {
        this.light = flatMap(this.note.measure.notes, note => note.getGuitarPos());
        this.light = uniqWith(this.light, isEqual);
      }  
    }
  }

  private _snapshotInterpolator(): void {
    this.interpolator = SnapshotFactory.getNoteInterpolator(this.note);
  }

  private _snapshotLoopData(): void {
    this.loopData = this.loopTick.sort().map(tick => {
      const note = SnapshotFactory.getCurrentNote(this.tab, tick);
      return {
        line: get(note, 'measure.line', null),
        interpolator: SnapshotFactory.getNoteInterpolator(note)
      };
    });
  }

  private _snapshotIsLoopScrubbing(): void {
    this.isLoopScrubbing = Boolean(
      this.prevSnapshot && !isEqual(this.prevSnapshot.data.loopTick, this.loopTick)
    );
  }
}

export default SnapshotFactory;
