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

class SnapshotFactory {
  // attrs set from the constructor
  prevSnapshot: Snapshot;
  tab: Tab;
  tick: number;
  timeMs: number;
  loopTick: Array<number>;
  showMoreNotes: boolean;
  tuning: Tuning;

  // computed data
  maestroData: MaestroData;
  tabData: TabData;
  fretboardData: FretboardData;
  loopData: LoopData;
  focusedData: FocusedData;

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

  constructor(refs: SFRefs, timeData: SFTimeData, options: Maestro.Options) {
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
      maestro: this.maestroData,
      tab: this.tabData,
      fretboard: this.fretboardData,
      loop: this.loopData,
      focused: this.focusedData
    }
  }

  private _doSnapshot(): void {
    this._snapshotMaestroData();
    this._snapshotTabData();
    this._snapshotFretboardData();
    this._snapshotLoopData();
    this._snapshotFocusedData();
  }

  private _snapshotMaestroData(): void {
    this.maestroData = {
      tick: this.tick,
      timeMs: this.timeMs
    };
  }

  private _snapshotTabData(): void {
    const note = SnapshotFactory.getCurrentNote(this.tab, this.tick);
    const measure = get(note, 'measure', null);
    const line = get(measure, 'line', null);

    this.tabData = {
      note,
      measure,
      line
    };
  }

  private _snapshotFretboardData(): void {
    let press: Array<GuitarPosition> = [];
    let justPress: Array<GuitarPosition> = [];
    let light: Array<GuitarPosition> = [];
    const { note } = this.tabData;

    if (note) {
      // Compute press notes
      press = note.getGuitarPos();

      // Compute a threshold that would be considered for "justPressed" positions
      const { tickRange } = note;
      const threshold = Math.min(...[
        tickRange.start + 250,
        tickRange.start + ((tickRange.stop - tickRange.start) * 0.50)
      ]);

      if (this.maestroData.tick < threshold) {
        justPress = note.getGuitarPos();
      }
    }

    // Compute light notes
    if (note) {
      if (this.showMoreNotes) {
        const noteNames = flatMap(note.measure.notes, measureNote => measureNote.staveNote.keys);
        const lightNotes = uniq(noteNames).filter(noteName => !startsWith(noteName.toUpperCase(), 'R'));
        light = flatMap(lightNotes, lightNote => this.tuning.getGuitarPositions(lightNote));
      } else {
        light = flatMap(note.measure.notes, note => note.getGuitarPos());
        light = uniqWith(light, isEqual);
      }  
    }

    this.fretboardData = {
      lightGuitarPositions: light,
      justPressGuitarPositions: justPress,
      pressGuitarPositions: press
    };
  }

  private _snapshotLoopData(): void {
    const tickRange = this.loopTick;

    // Compute notes
    const notes = tickRange.map(tick => (
      SnapshotFactory.getCurrentNote(this.tab, tick)
    ));

    // Compute isScrubbing
    const prevTickRange = get(this.prevSnapshot, 'data.loop.tickRange');
    const isScrubbing = Boolean(
      this.prevSnapshot && !isEqual(prevTickRange, tickRange)
    );

    // Compute changed array
    const changed = tickRange.map((tick, ndx) => prevTickRange[ndx] !== tick);

    this.loopData = {
      notes,
      changed,
      tickRange,
      isScrubbing
    };
  }

  private _snapshotFocusedData(): void {
    const changedLoopNdx = this.loopData.changed.indexOf(true)
    const line = get(this.loopData.notes[changedLoopNdx], 'measure.line')

    this.focusedData = {
      line: line || this.tabData.line
    }
  }
}

export default SnapshotFactory;
