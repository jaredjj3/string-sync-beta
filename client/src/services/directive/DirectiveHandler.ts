import { DirectiveObject } from 'services';
import { Flow } from 'vexflow';

// This class takes one or more directives, and performs preprocessing and/or
// post processing using a Vexflow stave object or a Tab service object.
class DirectiveHandler {
  directive: DirectiveObject;
  behavior: Directive.HandlerBehaviors = 'PASSIVE';

  constructor(directive: DirectiveObject) { 
    this.directive = directive;
  }

  exec(): boolean {
    switch (this.behavior) {
      case 'PASSIVE':
        return false;
      case 'PREPROCESS':
        this._execPreprocessors();
        return true;
      case 'POSTPROCESS':
        this._execPostprocessors();
        return true;
      default:
        return false;
    }
  }

  private _execPreprocessors(): void {
    switch (this.directive.type) {
      case 'GRACE_NOTE':
        this._handleGraceNote();
        break;
      default:
        break;
    }
  }

  private _execPostprocessors(): void {
    // noop
  }

  private _handleGraceNote(): void {
    const { positions, duration, slur } = this.directive.struct;
    const { tabNote, staveNote, maestro } = this.directive.refs;
    const { tuning } = maestro;
    const _duration = duration || '8';

    // Create graceTabNoteGroup
    const graceTabNote = new Flow.GraceTabNote({ positions, duration: _duration });
    const graceTabNoteGroup = new Flow.GraceNoteGroup([graceTabNote], !!slur);

    // Append graceTabNoteGroup to tabNote's modifiers
    tabNote.addModifier(graceTabNoteGroup);
    graceTabNote.context = tabNote.context;
    graceTabNote.tickContext = tabNote.getTickContext();

    // Create graceNoteGroup
    const keys = graceTabNote.positions.map(pos => tuning.vexflowTuning.getNoteForFret(pos.fret, pos.str));
    const { fret, str } = graceTabNote.positions[0];
    const stemDirection = tuning.vexflowTuning.getValueForFret(fret, str) >= 59 ? -1 : 1; // B/5
    const graceNote = new Flow.GraceNote({
      keys,
      duration: _duration,
      slash: true,
      stem_direction: stemDirection
    });
    const graceNoteGroup = new Flow.GraceNoteGroup([graceNote], !!slur);

    // Append graceNoteGroup to staveNote's modifier
    staveNote.addModifier(0, graceNoteGroup);
    graceNote.context = staveNote.context;
    graceNote.tickContext = staveNote.getTickContext();
  }
}

export default DirectiveHandler;
