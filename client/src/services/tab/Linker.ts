import { Line, Measure, Note } from 'services';
import { groupBy, merge, last } from 'lodash';

interface BarNoteChunk {
  barNote: any;
  tabNotes: any;
  staveNotes: any;
}

// This class is used to link Vexflow objects to the Line, Measure, and Note services.
class Linker {
  line: Line = null;
  stave: any = null;
  notesByType: any = {};
  barNoteChunks: Array<BarNoteChunk> = [];

  static noteType(note: any): string {
    const { type } = note.attrs;

    // Ghost notes are considered tabNotes
    return type === 'GhostNote' ? 'TabNote' : type;
  }

  static chunkBarNotes(stave: any): Array<BarNoteChunk> {
    let barNote = null;
    let beginIndex = 0;
    const chunks = [];
    const noteNotes = stave.note_notes;
    const tabNotes  = stave.tab_notes;

    noteNotes.forEach((note, endIndex) => {
      const isBarNote = Linker.noteType(note) === 'BarNote';

      // The endIndex increases every iteration of the forEach callback, therefore
      // we only need to keep track of the index and act if the current note is
      // a BarNote.
      if (isBarNote) {
        if (barNote !== null) {
          // A second barNote has been found. The notes in [beginIndex, endIndex]
          // must contain all the notes that belong to the current barNote.
          chunks.push({
            barNote,
            tabNotes: tabNotes.slice(beginIndex, endIndex),
            staveNotes: noteNotes.slice(beginIndex, endIndex)
          });
        }

        barNote = note;
        beginIndex = endIndex + 1;
      }
    });

    // purge the last BarNoteChunk
    chunks.push({
      barNote,
      tabNotes: tabNotes.slice(beginIndex, tabNotes.length),
      staveNotes: noteNotes.slice(beginIndex, noteNotes.length)
    });

    return chunks;
  }

  constructor(line: Line, stave: any) {
    this.line = line;
    this.stave = stave;

    this.barNoteChunks = Linker.chunkBarNotes(stave);

    const tabNotesByType = groupBy(stave.tab_notes, Linker.noteType);
    const noteNotesByType = groupBy(stave.note_notes, Linker.noteType);
    this.notesByType = merge({}, tabNotesByType, noteNotesByType);
  }

  link(): Linker {
    this._linkLine();
    this._linkMeasures();
    this._linkNotes();
    return this;
  }

  unlink(): Linker {
    this._unlinkLine();
    this._unlinkMeasures();
    return this;
  }

  private _linkLine(): void {
    this.line.tabStave = this.stave.tab;
    this.line.noteStave = this.stave.note;
  }

  private _linkMeasures(): void {
    const { measures } = this.line;
    const barNotes = this.notesByType.BarNote;

    if (measures.length !== barNotes.length) {
      console.warn('expected measure and BarNote lengths to be equal, continuing anyway');
    }

    measures.forEach((measure, ndx) => measure.barNote = barNotes[ndx] || null);
  }

  private _linkNotes(): void {
    const { measures } = this.line;

    this.barNoteChunks.forEach((chunk, measureNumber) => {
      if (chunk.staveNotes.length !== chunk.tabNotes.length) {
        console.warn('expected staveNotes and tabNotes lengths to be equal, continuing anyway');
      }

      const notes = [];
      const measure = measures[measureNumber];

      chunk.staveNotes.forEach((staveNote, noteIndex) => {
        const tabNote = chunk.tabNotes[noteIndex];

        const note = new Note(measure, tabNote, staveNote);
        const prev = last(notes) || null;

        note.setPrev(prev);
        notes.push(note);
      });

      measure.notes = notes;
    });
  }

  private _unlinkLine(): void {
    this.line.tabStave = null;
    this.line.noteStave = null;
  }

  private _unlinkMeasures(): void {
    this.line.measures.forEach(measure => {
      measure.notes.forEach(note => note.measure = null);
      measure.notes = [];
    });
  }
}

export default Linker;
