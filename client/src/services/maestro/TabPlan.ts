import { Tab, Note } from 'services';
import { Flow } from 'vexflow';
import { flatMap, sortBy, values, last } from 'lodash';

const { Fraction } = Flow;

class TabPlan {
  tab: Tab = null;
  execution: any = null;

  constructor(tab: Tab) {
    this.tab = tab;
  }

  setup(): TabPlan {
    this._updateNoteTickStarts();
    this._updateNoteTickStops();
    return this;
  }

  execute(isMediaActive: boolean, currentTimeMs: number, currentTick: number): TabPlan {
    return this;
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
            note.tick.stop = note.next.tick.start - 1;
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
