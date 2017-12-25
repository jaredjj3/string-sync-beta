import { mapValues, groupBy, compact } from 'lodash';

const BASE_TOKENS = ['|', '=||', '=|:', '=::', '=|='];

const MEASURE_TOKENS = BASE_TOKENS.map(token => `notes ${token}`).concat(BASE_TOKENS);

const MEASURE_TOKENS_BY_LENGTH = mapValues(
  groupBy(MEASURE_TOKENS, token => token.length), token => new Set(token)
);

const LENGTHS = Object.keys(MEASURE_TOKENS_BY_LENGTH);

class MeasureSplitter {
  vextabString: string = '';
  buffer: string = '';
  measures: Array<string> = [];

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  split(): MeasureSplitter {
    let beginIndex = 0;
    while (beginIndex < this.vextabString.length - 1) {
      let measureDetected = false;

      for (let length of LENGTHS) {
        const measureTokens = MEASURE_TOKENS_BY_LENGTH[length];
        const size = parseInt(length, 10);
        const endIndex = beginIndex + size;
        const chars = this.vextabString.slice(beginIndex, endIndex);

        if (measureTokens.has(chars)) {
          measureDetected = true;
          this._purgeBuffer();
          this.buffer = chars;
          beginIndex += size;
          break;
        }
      }

      if (!measureDetected) {
        this.buffer += this.vextabString[beginIndex];
        beginIndex++;
      }
    }

    this._purgeBuffer();
    this._compactMeasures();

    return this;
  }

  private _purgeBuffer(): MeasureSplitter {
    this.measures.push(this.buffer);
    this.buffer = '';
    return this;
  }

  // get rid of lines that are just space characters so that we
  // don't mis-index measures
  private _compactMeasures(): MeasureSplitter {
    this.measures = compact(this.measures.map(measure => measure.trim()));
    return this;
  }
}

export default MeasureSplitter;
