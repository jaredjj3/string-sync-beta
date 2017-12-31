import Measure from './Measure';
import NoteRenderer from './NoteRenderer';

class Note {
  number: number = 0;
  prev: Note = null;
  next: Note = null;
  tabNote: any = null;
  staveNote: any = null;
  measure: Measure = null;
  renderer: NoteRenderer = null;
  tick: TickRange = {
    start: 0,
    stop: 0
  };

  constructor(measure: Measure, tabNote: any, staveNote: any) {
    this.measure = measure;
    this.tabNote = tabNote;
    this.staveNote = staveNote;

    this.renderer = new NoteRenderer(this).setStyle('DEFAULT');
  }

  setPrev(prev: Note): Note {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Note): Note {
    next.setPrev(this);
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

  getGuitarPos(): Array<GuitarPosition> {
    const guitarPositions = this.tabNote.positions || [];
    return guitarPositions.map(position => ({
      fret: parseInt(position.fret, 10),
      string: parseInt(position.str, 10) - 1
    }))
  }
}

export default Note;
