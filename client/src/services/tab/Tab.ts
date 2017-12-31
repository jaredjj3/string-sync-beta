import Line from './Line';
import Measure from './Measure';
import Note from './Note';
import { VextabParser } from './parser';
import { last } from 'lodash';

class Tab {
  measures: Array<Measure> = [];
  lines: Array<Line> = [];
  vextabString: string = '';
  parser: VextabParser = null;
  measuresPerLine: number = 0;
  error: string = null;
  width: number = 0;

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  setup(): boolean {
    this.error = null;

    try {
      this.parser = new VextabParser(this.vextabString);
      const parsed = this.parser.parse();
      const chunks = this.parser.chunk();
      this._createMeasures(chunks);
      return true;
    } catch (error) {
      this.error = error.message;
      return false;
    }
  }

  update(execution: PlanExecutions.Tab): Tab {
    return this;
  }

  createLines(measuresPerLine: number, width: number): Array<Line> {
    this.measuresPerLine = measuresPerLine;
    this.width = width;

    const lines = this._getMeasureGroups().map((measureGroup, lineNumber) =>
      new Line(measureGroup, lineNumber, width, this.measuresPerLine)
    );

    lines.forEach((line, ndx) => {
      const prev = lines[ndx - 1] || null;
      line.setPrev(prev);
    });

    return this.lines = lines;
  }

  select(line?: number, measure?: number, note?: number): Line | Measure | Note {
    const l = typeof line === 'number';
    const m = typeof measure === 'number';
    const n = typeof note === 'number';

    let result = null;
    let _line = this.lines[line];

    if (l && m && n) {
      const _measure = _line.select(measure) as Measure;
      result = _measure.select(note);
    } else if (l && m) {
      result = _line.select(measure);
    } else if (l) {
      result = _line;
    }

    return result || null;
  }

  private _createMeasures(chunks: Array<Vextab.Chunk>): Array<Measure> {
    this.measures = [];

    chunks.forEach(chunk => {
      chunk.vextabStringMeasures.forEach((vextabStringMeasure, ndx) => {
        const measure = new Measure({
          vextabString: vextabStringMeasure,
          vextabOptions: chunk.vextabOptionsString,
          vextabOptionsId: chunk.vextabOptionsId,
          number: this.measures.length + 1
        });

        const prev = last(this.measures) || null;
        measure.setPrev(prev);

        this.measures.push(measure);
      });
    });

    return this.measures;
  }

  private _getMeasureGroups(): Array<Array<Measure>> {
    const measureGroups = [];

    this.measures.forEach(measure => {
      const shouldCreateNewGroup = (
        measureGroups.length === 0 ||
        last(measureGroups).length === this.measuresPerLine ||
        (
          last(measureGroups).length > 0 &&
          last(last(measureGroups)).vextabOptionsId !== measure.vextabOptionsId
        )
      );

      if (shouldCreateNewGroup) {
        measureGroups.push([]);
      }

      last(measureGroups).push(measure);
    });

    return measureGroups;
  }
}

export default Tab;
