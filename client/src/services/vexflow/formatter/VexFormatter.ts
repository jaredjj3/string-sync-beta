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
  measures: Array<string> = [];
  textMeasures: Array<string> = [];
  chunkSize: number = 0;
  elements: Array<any> = [];

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
    this.elements = elements;
    const shouldUpdate = this.code !== code || this.width !== width || this.formatted === '';

    this.code = code;
    this.width = width;

    if (shouldUpdate) {
      this._format(elements);
    }

    return this.formatted;
  }

  private _format(elements: Array<any>): void {
    
  }
}

export default VexFormatter;
