import { Line, Measure, Note } from 'models';
import { flatMap, groupBy, merge, last } from 'lodash';
import { Flow } from 'vexflow';

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

        const graceNotes = flatMap(
          staveNote.modifiers.filter(mod => mod instanceof Flow.GraceNoteGroup),
          note => note.grace_notes
        );

        const graceTabNotes = flatMap(
          tabNote.modifiers.filter(mod => mod instanceof Flow.GraceNoteGroup),
          note => note.grace_notes
        );

        const noteSpecs = graceNotes.map((graceNote, ndx) => ({
          measure,
          tabNote: graceTabNotes[ndx],
          staveNote: graceNote
        }));
        noteSpecs.push({ measure, tabNote, staveNote });

        noteSpecs.forEach(({ measure, tabNote, staveNote }) => {
          const note = new Note(measure, tabNote, staveNote);

          if (tabNote.directives) {
            tabNote.directives.forEach(dir => {
              dir.refs.note = note;
              dir.refs.measure = measure;
              dir.refs.line = measure.line;
            });
          }

          const prev = last(notes) || null;
          notes.push(note);
        })
      });

      measure.notes = notes;

    });

    // if on the last line
    if (this.line.next === null) {
      this._fillRestNoteAttrs();
    }
  }

  // FIXME: Kind of janky...
  private _fillRestNoteAttrs(): void {
    const lines = [];
    let nextLine = this.line;

    while (nextLine) {
      lines.push(nextLine);
      nextLine = nextLine.prev;
    }

    const measures = flatMap(lines.reverse(), line => line.measures);
    const notes = flatMap(measures, measure => measure.notes);

    notes.forEach((note, noteIndex) => {
      note.number = noteIndex;
      
      if (noteIndex > 0) {
        note.setPrev(notes[noteIndex - 1])
      }
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
