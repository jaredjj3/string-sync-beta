import { vextabParser } from 'services';
import { flatMap, mapValues, mapKeys, groupBy, compact } from 'lodash';
import MeasureSplitter from './MeasureSplitter';
import { hash } from 'ssUtil';

class VextabParser {
  static BACKEND_PARSER: any = vextabParser;
  static OPTION_TOKEN_REGEX: RegExp = /^([a-z]+)=/;

  vextabString: string = '';
  strippedLines: Array<string> = [];
  parsed: Array<Vextab.Element> = [];
  chunks: Array<Vextab.Chunk> = [];

  static trimEachLine(vextabString: string): string {
    return vextabString.
      split(/\r\n|\r|\n/).
      map(line => line.trim()).
      join('\n');
  }

  static splitIntoMeasures(vextabString: string): Array<string> {
    const measureSplitter = new MeasureSplitter(vextabString).split();
    return measureSplitter.measures;
  }

  constructor(vextabString: string) {
    this.vextabString = vextabString;
  }

  // Deconstruct the vextabString into an intermediate object that will be consumed
  // in the link function.
  parse(): Array<Vextab.Element> {
    const strippedVextabString = VextabParser.trimEachLine(this.vextabString);
    this.strippedLines = strippedVextabString.split('\n');
    this.parsed = VextabParser.BACKEND_PARSER.parse(strippedVextabString);

    return this.parsed;
  }

  // Groups chunks of the vextabString by its options header. Each element is headed
  // with vextabOptions followed by the vextabString it is relevant to.
  chunk(): Array<Vextab.Chunk> {
    const optionTokens = this._getOptionTokens();
    this.chunks = [];
    let vextabOptions = [];
    let vextabString = [];

    this.vextabString.split('\n').forEach(line => {
      const tokens = line.split(/\s/).map(token => {
        // Try matching foo=none, bar=some
        const match = token.match(VextabParser.OPTION_TOKEN_REGEX);
        return match ? match[1] : token;
      });

      const isOptionLine = tokens.some(token => optionTokens.has(token));
      const shouldPurge = isOptionLine && vextabString.length > 0;
      if (shouldPurge) {
        this._appendVextabChunk(vextabOptions, vextabString);

        // reset the collections
        vextabOptions = [];
        vextabString = [];
      }

      // handle the line categorization
      (isOptionLine ? vextabOptions : vextabString).push(line);
    });

    // purge one more time since the last iteration of the main loop will not
    // account for it.
    this._appendVextabChunk(vextabOptions, vextabString);

    return this.chunks;
  }

  unparse(spec: any): string {
    const { _l, _c0, _c1 } = spec;
    const areArgumentsValid = (
      typeof _l  !== 'undefined' &&
      typeof _c0 !== 'undefined' &&
      typeof _c1 !== 'undefined'
    );

    if (!areArgumentsValid) {
      throw new Error(`expected ${JSON.stringify(spec)} to have defined properties: _l, _c0, _c1`);
    }

    const line = this.strippedLines[_l - 1];

    if (typeof line !== 'string') {
      return null;
    }

    // first pass try
    let vextabString = line.slice(_c0, _c1);

    if (spec.hasOwnProperty('time')) {
      vextabString = `:${spec.time}`;
    }

    if (spec.hasOwnProperty('string')) {
      vextabString += `/${spec.string}`;
    }

    // reset the vextabString to acommodate a chord
    if (spec.hasOwnProperty('chord')) {
      const chord = spec.chord.map(({ fret, string}) => `${fret}/${string}`).join('.');
      vextabString = `(${chord})`;
    }

    // reset the vextabString if the spec command is a bar
    if (spec.command === 'bar') {
      vextabString = `\nnotes ${vextabString}`;
    }

    if (spec.dot) {
      vextabString += 'd';
    }

    if (spec.articulation) {
      vextabString = spec.articulation + vextabString;
    }

    return vextabString;
  }

  // In the context of this function, a token is considered a contiguous string with
  // no space characters.
  private _getOptionTokens(): Set<string> {
    const elements = this.parsed.map(element => element.element);
    const options = flatMap(
      this.parsed, element => element.options.map(option => option.key)
    );
    return new Set([...elements, ...options]);
  }

  private _appendVextabChunk(vextabOptions: Array<string>, vextabStringLines: Array<string>): Array<Vextab.Chunk> {
    const vextabOptionsString = vextabOptions.join('\n');
    const vextabString = vextabStringLines.join('\n');
    const vextabStringMeasures = VextabParser.splitIntoMeasures(vextabString);
    const vextabOptionsId = hash(vextabOptionsString);

    this.chunks.push({
      vextabOptionsId,
      vextabOptionsString,
      vextabStringMeasures
    });

    return this.chunks;
  }
}

export default VextabParser;
