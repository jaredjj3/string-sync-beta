import Line from './Line';
import Measure from './Measure';
import { VextabParser } from './parser';
import { chunk, last } from 'lodash';

class Tab {
  measures: Array<Measure> = [];
  lines: Array<Line> = [];
  vextabString: string = '';
  parser: VextabParser = null;
  measuresPerLine: number = 0;

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  setup(): Tab {
    this.parser = new VextabParser(this.vextabString);
    const parsed = this.parser.parse();
    const chunks = this.parser.chunk();

    this._createMeasures(chunks);

    return this;
  }

  createLines(measuresPerLine: number): Array<Line> {
    this.measuresPerLine = measuresPerLine;
    const lines = chunk(this.measures, measuresPerLine).
      map(measureGroup => new Line(measureGroup));

    lines.forEach((line, ndx) => {
      const prev = lines[ndx - 1] || null;
      line.setPrev(prev);
    });

    return this.lines = lines;
  }

  private _createMeasures(chunks: Array<Vextab.Chunk>): Array<Measure> {
    this.measures = [];

    chunks.forEach(chunk => {
      chunk.vextabStringMeasures.forEach((vextabStringMeasure, ndx) => {
        const measure = new Measure(
          vextabStringMeasure,
          chunk.vextabOptionsString,
          chunk.vextabOptionsId
        );

        const prev = last(this.measures) || null;
        measure.setPrev(prev);

        this.measures.push(measure);
      });
    });

    return this.measures;
  }
}

export default Tab;
