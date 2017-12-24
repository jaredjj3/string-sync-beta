import { vextabParser } from 'services';
import { flatMap, mapValues, mapKeys, groupBy, compact } from 'lodash';
import MeasureSplitter from './MeasureSplitter';

class VextabParser {
  static BACKEND_PARSER: any = vextabParser;
  static OPTION_TOKEN_REGEX: RegExp = /^([a-z]+)=/;

  vextabString: string = '';
  vextabElements: Array<Vextab.Element> = [];
  vextabChunks: Array<Vextab.Chunk> = [];

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
  parse(): VextabParser {
    const strippedVextabString = VextabParser.trimEachLine(this.vextabString);
    this.vextabElements = VextabParser.BACKEND_PARSER.parse(strippedVextabString);
    return this;
  }

  // Groups chunks of the vextabString by its options header. Each element is headed
  // with vextabOptions followed by the vextabString it is relevant to.
  chunk(): VextabParser {
    const optionTokens = this._getOptionTokens();
    this.vextabChunks = [];
    let currVextabOptions = [];
    let currVextabString = [];

    this.vextabString.split('\n').forEach(line => {
      const tokens = line.split(/\s/).map(token => {
        // Try matching foo=none, bar=some
        const match = token.match(VextabParser.OPTION_TOKEN_REGEX);
        return match ? match[1] : token;
      });

      const isOptionLine = tokens.some(token => optionTokens.has(token));
      const shouldPurge = isOptionLine && currVextabString.length > 0;
      if (shouldPurge) {
        this._appendVextabChunk(currVextabOptions, currVextabString);

        // reset the collections
        currVextabOptions = [];
        currVextabString = [];
      }

      // handle the line categorization
      (isOptionLine ? currVextabOptions : currVextabString).push(line);
    });

    // purge one more time since the last iteration of the main loop will not
    // account for it.
    this._appendVextabChunk(currVextabOptions, currVextabString);

    return this;
  }

  // In the context of this function, a token is considered a contiguous string with
  // no space characters.
  private _getOptionTokens(): Set<string> {
    const elements = this.vextabElements.map(element => element.element);
    const options = flatMap(
      this.vextabElements, element => element.options.map(option => option.key)
    );
    return new Set([...elements, ...options]);
  }

  private _appendVextabChunk(vextabOptions: Array<string>, vextabStringLines: Array<string>): Array<Vextab.Chunk> {
    const vextabOptionsString = vextabOptions.join('\n');
    const vextabString = vextabStringLines.join('\n');
    const vextabStringMeasures = VextabParser.splitIntoMeasures(vextabString);

    this.vextabChunks.push({
      vextabOptionsString,
      vextabStringMeasures
    });

    return this.vextabChunks;
  }
}

export default VextabParser;
