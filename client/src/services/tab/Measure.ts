import Note from './Note';

interface MeasureSpec {
  vextabString: string;
  vextabOptions: string;
  vextabOptionsId: number;
  number: number;
}

// Linked list structure to make iterating through them easier.
class Measure {
  vextabString: string = '';
  vextabOptions: string = '';
  vextabOptionsId: number = -1;
  notes: Array<Note> = [];
  number: number = 0;
  prev: Measure = null;
  next: Measure = null;

  constructor(spec: MeasureSpec) {
    this.vextabString = spec.vextabString;
    this.vextabOptions = spec.vextabOptions;
    this.vextabOptionsId = spec.vextabOptionsId;
    this.number = spec.number;
  }

  setPrev(prev: Measure): Measure {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Measure): Measure {
    next.setPrev(this);
    return next;
  }
}

export default Measure;
