import { Flow } from 'vexflow';
import Note from './Note';

type NoteStyles = 'DEFAULT' | 'ACTIVE';

class NoteRenderer {
  static DEFAULT_NOTE_STYLE: any = {
    fillStyle: '#000000',
    strokeStyle: '#000000'
  };

  static ACTIVE_NOTE_STYLE: any = {
    fillStyle: '#FF0000',
    strokeStyle: '#FF0000'
  };

  note: Note = null;
  currentStyle: string = null;

  constructor(note: Note) {
    this.note = note;
  }

  setStyle(noteStyleName: NoteStyles): NoteRenderer {
    let style = null;
    this.currentStyle = noteStyleName;

    switch (noteStyleName) {
      case 'DEFAULT':
        style = NoteRenderer.DEFAULT_NOTE_STYLE;
        break;
      case 'ACTIVE':
        style = NoteRenderer.ACTIVE_NOTE_STYLE;
        break;
      default:
        break;
    }

    if (style) {
      const { tabNote, staveNote, graceNote } = this.note;

      if (tabNote) {
        tabNote.setStyle(style);

        tabNote.modifiers.forEach(mod => {
          if (mod instanceof Flow.GraceNoteGroup) {
            mod.grace_notes.forEach(graceTabNote => graceTabNote.setStyle(style));
          }
        });
      }

      if (staveNote) {
        staveNote.setStyle(style);
        staveNote.setLedgerLineStyle(style);
        staveNote.setFlagStyle(style);

        staveNote.modifiers.forEach(mod => {
          if (mod instanceof Flow.GraceNoteGroup) {
            mod.grace_notes.forEach(graceNote => {
              graceNote.setStyle(style);
              graceNote.setLedgerLineStyle(style);
              graceNote.setFlagStyle(style);
            });
          }
        });
      }
    }

    return this;
  }

  redraw(): NoteRenderer {
    const { tabNote, staveNote } = this.note;

    const ctx = staveNote.context;
    ctx.save();

    const { fillStyle, strokeStyle } = staveNote.getStyle();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;

    staveNote.drawNoteHeads();
    staveNote.drawLedgerLines();

    staveNote.modifiers.forEach(mod => {
      if (mod instanceof Flow.GraceNoteGroup) {
        mod.grace_notes.forEach(graceNote => {
          graceNote.drawNoteHeads();
          graceNote.drawLedgerLines();
        });
      }
    });

    if (typeof tabNote.drawPositions === 'function') {
      tabNote.drawPositions();
      tabNote.modifiers.forEach(mod => {
        if (mod instanceof Flow.GraceNoteGroup) {
          mod.grace_notes.forEach(graceTabNote => graceTabNote.drawPositions());
        }
      });
    }

    ctx.restore();

    return this;
  }
}

export default NoteRenderer;
