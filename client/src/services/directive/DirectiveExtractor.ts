import { Directive } from './';
import { startsWith } from 'lodash';

// This class is constructed with a Vexflow stave object and then gets extract() 
// called upon it. This mutates the stave object by excluding directive strings
// from its notes' modifiers and creating Directive objects from them.
class DirectiveExtractor {
  stave: any = null;
  directives: Array<Directive> = [];
  didExtraction: boolean = false;

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

    this.stave.tab_notes.forEach(tabNote => {
      const rawDirectives = [];  // strings to be used to create directives
      const nonDirectives = []; // other modifiers that are handled by Vexflow

      // Fill the *Directives arrays
      tabNote.modifiers.forEach(mod => {
        if (startsWith(mod.text, 'JSON=')) {
          // FIXME: Semicolons are used since Vextab's Artist class splits messages by commas.
          // Look into another workaround that allows the user to use genuine json strings.
          const json = mod.text.split('=')[1].replace(/\;/g, ',');
          rawDirectives.push(json);
        } else {
          nonDirectives.push(mod);
        }
      });

      // Effectively removes all of the rawDirectives from a given note's modifiers
      tabNote.modifiers = nonDirectives;

      // Take each of the rawDirective strings, create a Directive object from them,
      // and push it onto the directives member variable.
      rawDirectives.forEach(rawDirective => {
        this.directives.push(new Directive(rawDirective));
      });
    });

    this.didExtraction = true;
    return this.directives;
  }
}

export default DirectiveExtractor;
