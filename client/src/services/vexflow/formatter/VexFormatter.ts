import Process from './process';
import isBetween from 'util/isBetween';

import inChunksOf from 'util/inChunksOf';
import { merge } from 'lodash';

interface Param {
  key: string;
  value: string;
}

// The purpose of this utility class is to generate nicely
// spaced tablature so that it fits within a certain viewport.

class VexFormatter {
  // Object properties that characterize a note token
  static CHAR_TOKEN_PROPS: Array<string> = ['command', 'time', 'chord', 'fret'];

  code: string = '';
  width: number = 0;
  formatted: string = '';

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

  update(code: string, width: number, elements: Array<any>): string {
    const shouldUpdate = this.code !== code || this.width !== width || this.formatted === '';

    this.code = code;
    this.width = width;

    if (shouldUpdate) {
      this._format(elements);
    }

    return this.formatted;
  }

  private _format(elements: Array<any>): void {
    const deconstructed = this._deconstruct(elements);
    const reconstructed = this._reconstruct(deconstructed);

    const measures = reconstructed.components.notes.reduce((_measures, note) => {
        if (note.type === 'bar') {
          _measures.push([]);
        }

        _measures[_measures.length - 1].push(note.vextab);

        return _measures;
      }, []).map(measure => measure.join(' '));

    const tabstave = `tabstave ${reconstructed.components.options.vextab}`;

    const chunkSize = Math.min(this.measuresPerLine, measures.length - 1);
    const formatted = inChunksOf(chunkSize, measures, measureGroup => (
      [tabstave].concat([`notes ${measureGroup.join(' ')}`]).concat(['options space=20'])
    )).map(measure => measure.join('\n'));

    formatted.unshift('options space=40');

    this.formatted = formatted.join('\n\n');
  }

  private _deconstruct(elements: Array<any>): Array<any> {
    return elements.map(element => Process.element(element));
  }

  private _reconstruct(deconstructed: Array<any>): any {
    // For now, ignore all the auxilary options.
    const tabstaves = deconstructed.filter(element => element.type === 'tabstave');
    return tabstaves.reduce((masterTabstave, tabstave) => {
      const src = tabstave.components;
      const dst = masterTabstave.components;

      masterTabstave.components.notes = dst.notes.concat(src.notes);
      masterTabstave.components.text = dst.text.concat(src.text);
      // FIXME:
      // masterTabstave.components.options.vextab = dst.options.vextab.concat(src.options.vextab);

      return masterTabstave;
    });
  }

  private _measuresFrom(components: any): any {

  }
}

export default VexFormatter;
