import { Tab, Note, Line } from 'services';
import { Flow } from 'vexflow';
import { flatMap, sortBy, values, last } from 'lodash';
import { isBetween } from 'ssUtil';

const { Fraction } = Flow;

class TabPlan {
  tab: Tab = null;
  execution: PlanExecutions.Tab = {
    currentLine: null,
    currentMeasure: null,
    currentNote: null
  };

  constructor(tab: Tab) {
    this.tab = tab;
  }

  setup(): TabPlan {
    this._updateNoteTickStarts();
    this._updateNoteTickStops();
    return this;
  }

  reset(): TabPlan {
    this.execution = {
      currentLine: null,
      currentMeasure: null,
      currentNote: null
    };
    return this;
  }

  execute(currentTick: number): TabPlan {
    const { currentNote } = this.execution;

    const shouldExecute = (
      !currentNote ||
      !isBetween(currentTick, currentNote.tick.start, currentNote.tick.stop)
    );

    if (shouldExecute) {
      this.execution = this._getExecution(currentTick);
    }

    return this;
  }

  private _getExecution(tick: number): PlanExecutions.Tab {
    let execution = {
      currentLine: null,
      currentMeasure: null,
      currentNote: null
    };

    // FIXME: Make this look cleaner
    this.tab.lines.forEach(line => {
      const lineTickRange = line.getTickRange();
      if (isBetween(tick, lineTickRange.start, lineTickRange.stop)) {
        execution.currentLine = line;
        line.measures.forEach(measure => {
          const measureTickRange = measure.getTickRange();
          if (isBetween(tick, measureTickRange.start, measureTickRange.stop)) {
            execution.currentMeasure = measure;
            measure.notes.forEach(note => {
              if (isBetween(tick, note.tick.start, note.tick.stop)) {
                execution.currentNote = note;
              }
            });
          }
        });
      }
    });

    return execution;
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

    if (lastNote) {
      lastNote.tick.stop = Number.MAX_SAFE_INTEGER;
    }

    return this;
  }
}

export default TabPlan;
