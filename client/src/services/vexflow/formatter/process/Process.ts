import { Element, Param } from 'types/element';

declare type noteTokenTypes = 'command' | 'time' | 'chord' | 'fret';

// private utility functions/constants
const NOTE_TOKEN_TYPES: Array<noteTokenTypes> = ['command', 'time', 'chord', 'fret'];

const noteTokenType = (token: any): noteTokenTypes => {
  for (let prop of NOTE_TOKEN_TYPES) {
    if (token.hasOwnProperty(prop)) {
      return prop;
    }
  }
};

const joinParams = (params: Array<Param>) => (
  params.map(({ key, value }) => `${key}=${value}`).join(' ')
);

// This is a functional-style utility class that processes
// different token types. Most functions take a token spec
// and returns a string;
//
// To dynamically process something, import this class and
// use JavaScript's bracket method to access it.
// e.g. Process['options'](token) calls Process.options(token)

class Process {
  static element(element: Element.Options | Element.TabStave): string {
    const name: Element.Name = element.element; // correct
    return this.do(name, [element]) || '';
  }

  // Prevents callers from trying to invoke an undefined function.
  // This is intended to be used only within the class.
  private static do(funcName: string, args: Array<any>): any {
    const func = this[funcName];
    return func ? func(...args) : null;
  }

  // called by Process.element

  private static options(options: Element.Options): string {
    return `options ${joinParams(options.params)}`;
  }

  private static tabstave(tabstave: Element.TabStave): string {
    return '';
  }

  // called by Process.tabstave

  private static noteToken(noteToken: Element.Token): string {
    return this.do(noteTokenType(noteToken), [noteToken]) || '';
  }

  // called by Process.noteToken

  private static command(command: Element.Token): string {
    return '';
  }

  private static time(time: Element.Token): string {
    return '';
  }

  private static chord(chord: Element.Token): string {
    return '';
  }

  private static fret(fret: Element.Token): string {
    return '';
  }
}

export default Process;
