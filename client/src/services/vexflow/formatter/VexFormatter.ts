import Deconstructor from './deconstructor';

import isBetween from 'util/isBetween';
import { last } from 'lodash';

class VexFormatter {
  static PADDING: number = 20; // px
  static MAX_MEASURE_LENGTH: number = 300; // px

  formattedVextab: string = '';
  numMeasures: number = 0;
  width: number = 0;
  measureChunks: Array<Array<any>> = [];

  get measuresPerLine(): number {
    const { width } = this;

    switch (true) {
      case width <= 646:
        return 1;
      case isBetween(width, 646, 768):
        return 2;
      case isBetween(width, 768, 992):
        return 3;
      case isBetween(width, 992, 1200):
        return 4;
      case isBetween(width, 1200, 1680):
        return 5;
      default:
        return Math.ceil(width / 336);
    }
  }

  process(elements: Array<any>): string {
    const measures = this._reconstruct(this._deconstruct(elements));

    this.numMeasures = measures.length;

    const measuresPerLine = this.measuresPerLine;
    const chunkedMeasures = measures.reduce((_chunkedMeasures, measure) => {
      const shouldMakeNewLine = (
        _chunkedMeasures.length === 0 ||
        last(_chunkedMeasures).length >= measuresPerLine ||
        last(last(_chunkedMeasures)).head !== measure.head
      );

      if (shouldMakeNewLine) {
        _chunkedMeasures.push([]);
      }

      last(_chunkedMeasures).push(measure);

      return _chunkedMeasures;
    }, []);

    this.measureChunks = this._adjustMeasureChunks(chunkedMeasures);

    this.formattedVextab = this.measureChunks.reduce((formattedVextab, measureGroup) => {
      formattedVextab += ('\n' + measureGroup[0].head + '\n');
      formattedVextab += measureGroup.map(measure => measure.body).join('\n');
      return formattedVextab;
    }, '');

    return this.formattedVextab;
  }

  private _deconstruct(elements: Array<any>): Array<any> {
    return elements.map(element => Deconstructor.deconstruct(element));
  }

  private _reconstruct(deconstructed: Array<any>): Array<{ head: string, body: string }> {
    // For now, ignore all the auxilary options.
    const tabstaves = deconstructed.filter(element => element.type === 'tabstave');

    let head;
    let isFirstMeasure = true;
    return tabstaves.reduce((measures, tabstave) => {
      const { options, notes, text } = tabstave.components;

      if (options) {
        head = `tabstave ${options.vextab}`;
      }

      if (!head) {
        throw `did not have a head for ${tabstave}`;
      }

      let noteBuffer = 'notes';
      notes.forEach((note, index) => {
        const isBar = note.type === 'bar';
        const isLastNote = index === notes.length - 1;

        if (isBar && isFirstMeasure) {
          isFirstMeasure = false;
        } else if (isBar) {
          measures.push({ head, body: noteBuffer });
          noteBuffer = 'notes';
        }

        noteBuffer += ` ${note.vextab}`;

        if (isLastNote) {
          measures.push({ head, body: noteBuffer });
        }
      });

      if (text.length > 0) {
        measures[measures.length - 1].body += ('\ntext ' + text.map(t => t.vextab).join(','));
      }

      return measures;
    }, []);
  }

  private _adjustMeasureChunks(measureChunks: Array<Array<any>>): any {
    const lastMeasureChunk = last(measureChunks);

    if (lastMeasureChunk.length < this.measuresPerLine) {
      const pxPerMeasure = this.width / lastMeasureChunk.length;
      if (pxPerMeasure > VexFormatter.MAX_MEASURE_LENGTH) {
        const targetWidth = lastMeasureChunk.length * VexFormatter.MAX_MEASURE_LENGTH;
        this._appendWidth(lastMeasureChunk[0], targetWidth);
      }
    }

    return measureChunks;
  }

  private _appendWidth(measure: any, width: number): any {
    const head = `options width=${width}\n` + measure.head;
    return Object.assign(measure, { head });
  }
}

export default VexFormatter;
