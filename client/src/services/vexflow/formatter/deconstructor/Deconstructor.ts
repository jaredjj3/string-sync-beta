import { VexElement } from 'types';

declare type NoteTokenType = string | 'command' | 'time' | 'chord' | 'fret' | 'abc';

declare type CommandType = string | 'bar' | 'tuplet';

interface DeconstructedVexElement {
  type: NoteTokenType | CommandType;
  vextab: string;
}

// private utility functions/constants
const NOTE_TOKEN_TYPES: Array<NoteTokenType> = ['command', 'time', 'chord', 'fret', 'abc'];

const BARS_BY_TYPE: any = {
  'double-bar': '=||',
  'repeat-begin': '=|:',
  'repeat-end': '=:|',
  'double-repeat': '=::',
  'end': '=|=',
  'single': '|'
};

const noteTokenType = (token: any): NoteTokenType => {
  for (let prop of NOTE_TOKEN_TYPES) {
    if (token.hasOwnProperty(prop)) {
      return prop;
    }
  }

  throw `token ${token} did not resolve to one of: ${NOTE_TOKEN_TYPES.join(', ')}`;
};

const joinParams = (params: Array<VexElement.Param>) => (
  params.map(({ key, value }) => `${key}=${value}`).join(' ')
);

// This is a functional-style utility class that processes
// different token types. Most functions take a token spec
// and returns a string.
//
// To dynamically process something, import this class and
// use JavaScript's bracket method to access it.
// e.g. Deconstructor['options'](token) calls Deconstructor.options(token)

class Deconstructor {
  static deconstruct(token: VexElement.Options | VexElement.TabStave): any {
    const type: VexElement.Name = token.element;
    const components = this.do(type, [token]) || '';
    return { type, components };
  }

  // Prevents callers from trying to invoke an undefined function.
  // This is intended to be used only within the class.
  private static do(funcName: string, args?: Array<any>): any {
    const func: Function = this[funcName];
    return func ? func.apply(this, args) : null;
  }

  // called by Deconstructor.element

  private static options(options: any): DeconstructedVexElement {
    const type = 'options';
    const params = options.params || options;
    const vextab = joinParams(params);
    return { type, vextab };
  }

  private static tabstave (tabstave: VexElement.TabStave): any {
    const type = 'tabstave';
    const options = this.options(tabstave.options);
    const notes = tabstave.notes.map(note => this.note(note));
    const text = tabstave.text.map(_text => this.text(_text));

    return { type, options, notes, text };
  }

  // called by Deconstructor.tabstave

  private static note(token: VexElement.Token): DeconstructedVexElement {
    const tokenType = noteTokenType(token);
    const type = tokenType === 'command' ? token.command : tokenType;
    const vextab = this.do(tokenType, [token]) || '';
    return { type, vextab };
  }

  private static text(token: VexElement.Token): DeconstructedVexElement {
    const type = 'text';
    const vextab = token.text;
    return { type, vextab };
  }

  // called by Deconstructor.note

  private static command(token: VexElement.Token): string {
    const name: CommandType = token.command;
    return this.do(name, [token]) || '';
  }

  private static time(token: VexElement.Token): string {
    return `:${token.time}${token.dot ? 'd' : ''}`;
  }

  private static chord(token: VexElement.Token): string {
    const chordStr = token.chord.map(({ fret, string, decorator }) => (
      `${token.articulation || ''}${fret}${decorator || ''}/${string}`
    )).join('.');

    return `(${chordStr})${token.decorator || ''}`;
  }

  private static fret(token: VexElement.Token): string {
    return `${token.articulation || ''}${token.fret}${token.decorator || ''}/${token.string}`;
  }

  private static abc(token: VexElement.Token): string {
    return `${token.abc.key}/${token.string}`;
  }

  private static annotations(token: VexElement.Token): string {
    return `$${token.params.join(',')}$`;
  }

  // called by Deconstructor.command

  private static bar(token: VexElement.Token): string {
    return BARS_BY_TYPE[token.type];
  }

  private static rest(token: VexElement.Token): string {
    const { position } = token.params;
    return `#${position ? position : ''}#`;
  }

  private static tuplet(token: VexElement.Token): string {
    return `^${token.params.tuplet}^`;
  }
}

export default Deconstructor;
export { DeconstructedVexElement };
