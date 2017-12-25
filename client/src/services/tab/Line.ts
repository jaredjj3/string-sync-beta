import { Measure } from 'services';

class Line {
  measures: Array<Measure> = [];
  vextabString: string = '';
  prev: Line = null;
  next: Line = null;

  constructor(measures: Array<Measure>) {
    this.measures = measures;

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
          vextabStrings.push(options.string + '\n' + buffer.join(''));
          buffer = [];
        }

        options.id = measure.vextabOptionsId;
        options.string = measure.vextabOptions;
      }

      buffer.push(measure.vextabString);
    });

    // purge the last buffer
    vextabStrings.push(options.string + '\n' + buffer.join(''));

    return this.vextabString = vextabStrings.join('\n');
  }
}

export default Line;
