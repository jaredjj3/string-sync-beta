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
  barNote: any = null;

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

  select(note?: number): Note {
    const result = typeof note === 'number' ? this.notes[note] : null;
    return result || null;
  }

  getTickRange(): NumRange {
    const startNote = this.select(0);
    const stopNote = this.select(this.notes.length - 1);

    return {
      start: startNote ? startNote.tick.start : 0,
      stop: stopNote ? stopNote.tick.stop : 0
    };
  }
}

export default Measure;
