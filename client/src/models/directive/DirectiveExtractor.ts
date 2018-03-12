import { DirectiveObject } from './';
import { startsWith, partition } from 'lodash';
import { Fretboard, Maestro } from 'models';

// This class is constructed with a Vexflow stave object and then gets extract() 
// called upon it. This mutates the stave object by excluding directive strings
// from its notes' modifiers and creating Directive objects from them.
class DirectiveExtractor {
  // refs
  stave: any = null;
  maestro: Maestro = null;

  directives: Array<DirectiveObject> = [];
  didExtraction: boolean = false;

  // The argument is a single modifier from a vexflow tabNote or staveNote that has a
  // text attribute.
  static isDirective(modifier: any): boolean {
    return startsWith(modifier.text, 'JSON=');
  }

  // The first array in the return value corresponds to directive modifiers and the
  // second array corresponds to non-directive modifiers.
  static partitionModifiers(modifiers: Array<any>): [Array<any>, Array<any>] {
    return partition(modifiers, DirectiveExtractor.isDirective);
  }

  constructor(stave: any, maestro: Maestro) {
    this.stave = stave;
    this.maestro = maestro;
  }

  // The primary method used to mutate a Vexflow stave object and set the directives
  // member variable. This function mutates the Vexflow stave object once. Subsequent
  // calls return the cached result.
  extract(): Array<DirectiveObject> {
    if (!this.didExtraction) {
      this.stave.tab_notes.forEach((tabNote, ndx) => {
        const staveNote = this.stave.note_notes[ndx];
        this._doExtraction(tabNote, staveNote);
      });
    }

    return this.directives;
  }

  private _doExtraction(tabNote, staveNote): void {
    const [directiveMods, nonDirectiveMods] = DirectiveExtractor.partitionModifiers(tabNote.modifiers);

    // MUTATION!
    // Effectively removes all of the rawDirectives from a given tabNote's modifiers
    // The staveNote should not have any directive modifiers on it
    tabNote.modifiers = nonDirectiveMods;

    // compute refs, which are used by the DirectiveHandler
    const refs = {
      tabNote,
      staveNote,
      stave: this.stave,
      maestro: this.maestro
    };

    // Create a directive from the directiveMods and push it onto the directives member
    directiveMods.forEach(mod => {
      // FIXME: Overly complicated logic to hack JSON since Vextab handles commas differently
      const directiveStruct = JSON.parse(mod.text.split('=')[1].replace(/\;/g, ','));
      const directive = new DirectiveObject(directiveStruct, refs);
      this.directives.push(directive);
      
      // Add a reference of the directive to the tabNote
      tabNote.directives = tabNote.directives || [];
      tabNote.directives.push(directive);
    });

    this.didExtraction = true;
  }
}

export default DirectiveExtractor;
