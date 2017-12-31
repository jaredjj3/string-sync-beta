import { Tab, Note, Line } from 'services';
import { Flow } from 'vexflow';
import { flatMap, sortBy, values, last } from 'lodash';
import { isBetween } from 'ssUtil';

const { Fraction } = Flow;

class TabPlan {
  tab: Tab = null;
  execution: PlanExecutions.Tab = {
    currentNote: null,
    currentLine: null
  };

  constructor(tab: Tab) {
    this.tab = tab;
  }

  setup(): TabPlan {
    this._updateNoteTickStarts();
    this._updateNoteTickStops();
    return this;
  }

  execute(currentTick: number): TabPlan {
    const { currentNote } = this.execution;

    if (!currentNote || !isBetween(currentTick, currentNote.tick.start, currentNote.tick.stop)) {
      this.execution.currentNote = this._getNote(currentTick);
      this.execution.currentLine = this._getLine(currentTick);
    }

    return this;
  }

  private _getNote(tick: number): Note {
    let resultNote: Note = null;

    // FIXME: Make this look cleaner
    this.tab.lines.forEach(line => {
      const lineTickRange = line.getTickRange();
      if (isBetween(tick, lineTickRange.start, lineTickRange.stop)) {
        line.measures.forEach(measure => {
          const measureTickRange = measure.getTickRange();
          if (isBetween(tick, measureTickRange.start, measureTickRange.stop)) {
            measure.notes.forEach(note => {
              if (isBetween(tick, note.tick.start, note.tick.stop)) {
                resultNote = note;
              }
            });
          }
        });
      }
    });

    return resultNote;
  }

  private _getLine(tick: number): Line {
    let resultLine: Line = null;

    this.tab.lines.forEach(line => {
      const lineTickRange = line.getTickRange();
      if (isBetween(tick, lineTickRange.start, lineTickRange.stop)) {
        resultLine = line;
      }
    })

    return resultLine;
  }

  private _updateNoteTickStarts(): TabPlan {
    const totalTicks = new Fraction(0, 1);

    this.tab.lines.forEach(line => {
      const maxTick = new Fraction(0, 1);

      line.measures.forEach(measure => {
        const totalMeasureTicks = new Fraction(0, 1);

        measure.notes.forEach(note => {
          const absTick = totalTicks.clone();
          note.tick.start = absTick.add(totalMeasureTicks).simplify().value();

          if (note.getType() === 'note') {
            const noteTicks = note.getTicks();
            totalMeasureTicks.add(noteTicks.numerator, noteTicks.denominator);
          }
        });

        if (totalMeasureTicks.value() > maxTick.value()) {
          maxTick.copy(totalMeasureTicks);
        }

        totalTicks.add(maxTick);
      });
    });

    return this;
  }

  private _updateNoteTickStops(): TabPlan {
    this.tab.lines.forEach(line => {
      line.measures.forEach(measure => {
        measure.notes.forEach(note => {
          if (note.next) {
            note.tick.stop = note.next.tick.start;
          }
        });
      });
    });

    const lastNote = last(last(last(this.tab.lines).measures).notes);
    lastNote.tick.stop = Number.MAX_SAFE_INTEGER;

    return this;
  }
}

export default TabPlan;
