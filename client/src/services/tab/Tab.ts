import Line from './Line';
import Measure from './Measure';
import Note from './Note';
import { VextabParser } from './parser';
import { flatMap } from 'lodash';

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

  private _setupMeasures(): Tab {
    this.measures = [];

    this.parser.vextabChunks.forEach(vextabChunk => {
      vextabChunk.vextabStringMeasures.forEach(vextabString => {
        this.measures.push(new Measure(vextabString, vextabChunk.vextabOptionsString));
      });
    });

    return this;
  }
}

export default Tab;
