import { Artist, Measure } from 'services';
import Linker from './Linker';

class Line {
  static MAX_MEASURE_LENGTH: number = 400;

  measures: Array<Measure> = [];
  targetNumMeasures: number = null;
  vextabString: string = '';
  number: number = null;
  width: number = null;
  prev: Line = null;
  next: Line = null;
  tabStave: any = null;
  noteStave: any = null;
  linker: Linker = null;

  constructor(measures: Array<Measure>, number: number, width: number, targetNumMeasures: number) {
    this.measures = measures;
    this.number = number;
    this.width = width;
    this.targetNumMeasures = targetNumMeasures;

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

  link(artist: Artist): Linker {
    this.linker = new Linker(this, artist.staves[0]);
    this.linker.link();
    return this.linker;
  }

  unlink(): Linker {
    const { linker } = this;
    this.linker = null;
    linker.unlink();
    return linker;
  }

  private _extractVextabString(): string {
    const options = { id: null, string: null };
    let buffer = [];
    const vextabStrings = [];

    this.measures.forEach(measure => {
      if (measure.vextabOptionsId !== options.id) {
        if (options.string) {
          // purge string from buffer
          const optionsString = this._addWidthToOptions(options.string);
          vextabStrings.push(optionsString + '\n\n' + buffer.join('\n') + '\n\n');
          buffer = [];
        }

        options.id = measure.vextabOptionsId;
        options.string = measure.vextabOptions;
      }

      buffer.push(measure.vextabString);
    });

    // purge the last buffer
    const optionsString = this._addWidthToOptions(options.string);
    vextabStrings.push(optionsString + '\n\n' + buffer.join('\n'));

    return this.vextabString = vextabStrings.join('\n');
  }

  private _addWidthToOptions(optionsString: string): string {
    const { MAX_MEASURE_LENGTH } = Line;
    const numMeasures = this.measures.length;
    const pxPerMeasure = this.width / numMeasures;

    if (this.targetNumMeasures > 1 && pxPerMeasure > MAX_MEASURE_LENGTH) {
      const targetWidth = numMeasures * MAX_MEASURE_LENGTH;
      return `options width=${targetWidth}\n${optionsString}`;
    } else {
      return optionsString;
    }
  }
}

export default Line;
