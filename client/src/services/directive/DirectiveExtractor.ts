import { Directive } from './';
import { startsWith, partition } from 'lodash';

// This class is constructed with a Vexflow stave object and then gets extract() 
// called upon it. This mutates the stave object by excluding directive strings
// from its notes' modifiers and creating Directive objects from them.
class DirectiveExtractor {
  stave: any = null;
  directives: Array<Directive> = [];
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

  static createDirective(modifier: any, refs: any): Directive {
    // FIXME: Overly complicated logic to hack JSON since Vextab handles commas differently
    const directiveString = modifier.text.split('=')[1].replace(/\;/g, ',');
    return new Directive(directiveString, refs);
  }

  constructor(stave: any) {
    this.stave = stave;
  }

  // The primary method used to mutate a Vexflow stave object and set the directives
  // member variable. This function mutates the Vexflow stave object once. Subsequent
  // calls return the cached result.
  extract(): Array<Directive> {
    if (this.didExtraction) {
      return this.directives;
    }

    for (let ndx of this.stave.tab_notes) {
      const tabNote = this.stave.tab_notes[ndx];
      const staveNote = this.stave.note_notes[ndx];
      this._doExtraction(tabNote, staveNote);
    }

    this.didExtraction = true;
    return this.directives;
  }

  private _doExtraction(tabNote, staveNote): void {
    const [directiveMods, nonDirectiveMods] = DirectiveExtractor.
      partitionModifiers(tabNote.modifiers);

    // MUTATION!
    // Effectively removes all of the rawDirectives from a given tabNote's modifiers
    // The staveNote should not have any directive modifiers on it
    tabNote.modifiers = nonDirectiveMods;

    const refs = {
      tabNote,
      staveNote
    };

    // Create a directive from the directiveMods and push it onto the directives member
    directiveMods.forEach(mod => {
      const directive = DirectiveExtractor.createDirective(mod, refs);
      this.directives.push(directive);
    });
  }
}

export default DirectiveExtractor;
