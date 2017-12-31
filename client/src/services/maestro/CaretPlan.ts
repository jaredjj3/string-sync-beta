import { Note, Line } from 'services';
import { interpolator, isBetween } from 'ssUtil';

class CaretPlan {
  execution: PlanExecutions.Caret = {
    caretRenderer: null,
    interpolator: null,
    tickRange: null
  }

  static getInterpolator(note: Note): any {
    const posRange = note.getPosXRange();
    const tickRange = note.tick;

    const point1 = {
      x: tickRange.start,
      y: posRange.start
    };

    const point2 = {
      x: tickRange.stop,
      y: posRange.start > posRange.stop ? note.staveNote.stave.width : posRange.stop
    }

    return interpolator(point1, point2);
  }

  execute(currentTick: number, currentNote: Note, currentLine: Line): CaretPlan {
    const shouldReExecute = (
      !this.execution.tickRange ||
      !isBetween(currentTick, this.execution.tickRange.start, this.execution.tickRange.stop)
    );

    if (shouldReExecute) {
      const interpolator = CaretPlan.getInterpolator(currentNote);
      const tickRange = currentNote.tick;
      const { caretRenderer } = currentLine;

      this.execution = {
        interpolator,
        tickRange,
        caretRenderer
      }
    }

    return this;
  }
}

export default CaretPlan;
