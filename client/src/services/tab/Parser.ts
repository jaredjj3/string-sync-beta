import { vextabParser } from 'services';

class Parser {
  vextabString: string;

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  parse(): void {
    const strippedVextabString = this._strippedVextabString;
    const vtp = vextabParser;
    // vextabParser.parse(strippedVextabString);
    debugger
  }

  private get _strippedVextabString(): string {
    return this.vextabString.
      split(/\r\n|\r|\n/).
      map(line => line.trim()).
      join('\n');
  }
}

export default Parser;
