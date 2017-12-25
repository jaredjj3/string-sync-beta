import Line from './Line';
import Measure from './Measure';
import { VextabParser } from './parser';
import { chunk } from 'lodash';

class Tab {
  measures: Array<Measure> = [];
  vextabString: string = '';
  parser: VextabParser = null;

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  setup(): Tab {
    this.parser = new VextabParser(this.vextabString);
    this.parser.parse().chunk();

    this._setupMeasures();

    return this;
  }

  toLines(measuresPerLine: number): Array<Line> {
    return chunk(this.measures, measuresPerLine).map(measureGroup => new Line(measureGroup));
  }

  private _setupMeasures(): Tab {
    this.measures = [];
    const lastMeasure = null;
    const nextMeasure = null;

    this.parser.vextabChunks.forEach(vextabChunk => {
      vextabChunk.vextabStringMeasures.forEach(vextabString => {
        this.measures.push(new Measure(vextabString, vextabChunk.vextabOptionsString));
      });
    });

    return this;
  }
}

export default Tab;
