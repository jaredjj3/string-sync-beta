import { Measure } from 'services';

class Line {
  static MAX_MEASURE_LENGTH: number = 300;

  measures: Array<Measure> = [];
  vextabString: string = '';
  number: number = null;
  width: number = null;
  prev: Line = null;
  next: Line = null;

  constructor(measures: Array<Measure>, number: number, width: number) {
    this.measures = measures;
    this.number = number;
    this.width = width;

    this._extractVextabString();
  }

  setPrev(prev: Line): Line {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Line): Line {
    next.setPrev(this);
    return next;
  }

  private _extractVextabString(): string {
    const options = { id: null, string: null };
    let buffer = [];
    const vextabStrings = [];

    this.measures.forEach(measure => {
      if (measure.vextabOptionsId !== options.id) {
        if (options.string) {
          // purge string from buffer
          const optionsString = this._adjustedOptionsString(options.string, buffer.length);
          vextabStrings.push(optionsString + '\n\n' + buffer.join('\n') + '\n\n');
          buffer = [];
        }

        options.id = measure.vextabOptionsId;
        options.string = measure.vextabOptions;
      }

      buffer.push(measure.vextabString);
    });

    // purge the last buffer
    const optionsString = this._adjustedOptionsString(options.string, buffer.length);
    vextabStrings.push(optionsString + '\n\n' + buffer.join('\n'));

    return this.vextabString = vextabStrings.join('\n');
  }

  private _adjustedOptionsString(optionsString: string, numMeasures: number): string {
    const { MAX_MEASURE_LENGTH } = Line;
    const pxPerMeasure = this.width / numMeasures;

    if (pxPerMeasure > MAX_MEASURE_LENGTH) {
      const targetWidth = numMeasures * MAX_MEASURE_LENGTH;
      return `options width=${targetWidth}\n${optionsString}`;
    } else {
      return optionsString;
    }
  }
}

export default Line;
