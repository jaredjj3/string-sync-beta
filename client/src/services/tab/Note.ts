import Measure from './Measure';

interface Tick {
  start: number;
  stop: number;
}

class Note {
  number: number = 0;
  prev: Note = null;
  next: Note = null;
  tabNote: any = null;
  staveNote: any = null;
  measure: Measure = null;
  tick: Tick = {
    start: 0,
    stop: 0
  };

  constructor(measure: Measure, tabNote: any, staveNote: any, number: any) {
    this.measure = measure;
    this.tabNote = tabNote;
    this.staveNote = staveNote;
    this.number = number;
  }

  setPrev(prev: Note): Note {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Note): Note {

    return next;
  }

  // Returns a Vexflow fraction
  getTicks(): any {
    return this.staveNote.getTicks();
  }

  getType(): string {
    if (!this.staveNote.shouldIgnoreTicks()) {
      return 'note';
    } else if (this.staveNote.getDuration() === 'b') {
      return 'bar';
    } else {
      return 'n/a';
    }
  }

  getPosX(): number {
    return this.staveNote.getAbsoluteX();
  }
}

export default Note;
