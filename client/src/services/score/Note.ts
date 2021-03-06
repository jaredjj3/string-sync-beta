import { Flow } from 'vexflow'; 
import { NoteRenderer } from 'services';
import { Measure } from './';
import { interpolator } from 'ssUtil';

class Note {
  number: number = 0;
  prev: Note = null;
  next: Note = null;
  tabNote: any = null;
  staveNote: any = null;
  measure: Measure = null;
  renderer: NoteRenderer = null;
  interpolator: Function = null;

  tickRange: NumRange = {
    start: 0,
    stop: 0
  };

  constructor(measure: Measure, tabNote: any, staveNote: any) {
    this.measure = measure;
    this.tabNote = tabNote;
    this.staveNote = staveNote;

    this.renderer = new NoteRenderer(this).setStyle('DEFAULT');
  }

  get isGraceNote(): boolean {
    return this.staveNote.getCategory() === 'gracenotes';
  }

  get isRest(): boolean {
    return this.staveNote.getNoteType() === 'r';
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

  computeInterpolator(): Function {
    const posRange = this.getPosXRange();
    const { tickRange } = this;

    this.interpolator = interpolator(
      { x: tickRange.start, y: posRange.start },
      { x: tickRange.stop, y: posRange.start > posRange.stop ? this.staveNote.stave.width : posRange.stop }
    );

    return this.interpolator;
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

  getPosXRange(): NumRange {
    return {
      start: this.getPosX(),
      stop: this.next ? this.next.getPosX() : Number.MAX_SAFE_INTEGER
    };
  }

  getGuitarPos(): Array<GuitarPosition> {
    let guitarPositions = this.tabNote.positions || [];

    if (this.tabNote.modifiers.length > 0) {
      this.tabNote.modifiers.forEach(mod => {
        if (mod instanceof Flow.GraceNoteGroup) {
          mod.grace_notes.forEach(graceTabNote => {
            guitarPositions = guitarPositions.concat(graceTabNote.positions);
          });
        }
      });
    }

    return guitarPositions.map(position => ({
      fret: parseInt(position.fret, 10),
      str: parseInt(position.str, 10) - 1
    }))
  }
}

export default Note;
