import { Element, Param } from 'types/element';

declare type NoteTokenType = string | 'command' | 'time' | 'chord' | 'fret';

declare type CommandType = string | 'bar' | 'tuplet';

interface ProcessedElement {
  type: NoteTokenType | CommandType;
  vextab: string;
}

// private utility functions/constants
const NOTE_TOKEN_TYPES: Array<NoteTokenType> = ['command', 'time', 'chord', 'fret'];

const BARS_BY_TYPE: any = {
  'double-bar': '=||',
  'repeat-begin': '=|:',
  'repeat-end': '=:|',
  'double-repeat': '=::',
  'end-bar': '=|='
};

const noteTokenType = (token: any): NoteTokenType => {
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
// and returns a string.
//
// To dynamically process something, import this class and
// use JavaScript's bracket method to access it.
// e.g. Process['options'](token) calls Process.options(token)

class Process {
  static element(token: Element.Options | Element.TabStave): ProcessedElement {
    const type: Element.Name = token.element;
    const vextab = this.do(type, [token]) || '';
    return { type, vextab };
  }

  // Prevents callers from trying to invoke an undefined function.
  // This is intended to be used only within the class.
  private static do(funcName: string, args?: Array<any>): any {
    const func: Function = this[funcName];
    return func ? func.apply(this, args) : null;
  }

  // called by Process.element

  private static options(options: Element.Options): ProcessedElement {
    const type = 'options';
    const vextab = `options ${joinParams(options.params)}`;
    return { type, vextab };
  }

  private static tabstave (tabstave: Element.TabStave): any {
    const options = tabstave.options.map(option => this.options(option)).join(' ');
    const notes = tabstave.notes.map(note => this.note(note)).join(' ');
    const text = tabstave.text.map(_text => this.text(_text)).join(',');

    return `
      tabstave ${options}
      notes ${notes}
      text ${text}
    `;
  }

  // called by Process.tabstave

  private static note(token: Element.Token): ProcessedElement {
    const type = 'note';
    const vextab = this.do(noteTokenType(token), [token]) || '';
    return { type, vextab };
  }

  private static text(token: Element.Token): ProcessedElement {
    const type = 'text';
    const vextab = token.text;
    return { type, vextab };
  }

  // called by Process.note

  private static command(token: Element.Token): ProcessedElement {
    const name: CommandType = token.command;
    return this.do(name, [token]) || '';
  }

  private static time(token: Element.Token): ProcessedElement {
      const type = 'time';
      const vextab = `:${token.time}${token.dot ? 'd' : ''}`;
      return { type, vextab };
  }

  private static chord(token: Element.Token): ProcessedElement {
    const chordStr = token.chord.map(({ fret, string, decorator }) => (
      `${fret}${decorator || ''}/${string}`
    )).join('.');

    const type = 'chord';
    const vextab = `(${chordStr})${token.decorator || ''}`;
    return { type, vextab };
  }

  private static fret(token: Element.Token): ProcessedElement {
    const type = 'fret';
    const vextab = `${token.articulation || ''}${token.fret}${token.decorator || ''}/${token.string}`;
    return { type, vextab };
  }

  // called by Process.command

  private static bar(token: Element.Token): ProcessedElement {
    return BARS_BY_TYPE[token.type];
  }

  private static tuplet(token: Element.Token): ProcessedElement {
    const type = 'tuplet';
    const vextab = `^${token.params.tuplet}^`;
    return { type, vextab };
  }
}

export default Process;
