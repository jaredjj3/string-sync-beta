import Measure from './Measure';

class Note {
  number: number = 0;
  prev: Note = null;
  next: Note = null;
  tabNote: any = null;
  staveNote: any = null;
  measure: Measure = null;

  constructor(measure: Measure, tabNote: any, staveNote: any) {
    this.measure = measure;
    this.tabNote = tabNote;
    this.staveNote = staveNote;
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
}

export default Note;
