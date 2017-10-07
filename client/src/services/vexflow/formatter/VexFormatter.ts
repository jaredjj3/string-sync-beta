import isBetween from 'util/isBetween';
import { startsWith, last, chunk } from 'lodash';

interface FormatBuffer {
  options: Array<string>;
  measures: Array<{ notes: string, text?: string }>;
  lastDirective: string;
}

interface Param {
  key: string;
  value: string;
}

// The purpose of this utility class is to generate nicely
// spaced tablature so that it fits within a certain viewport.

class VexFormatter {
  static DIRECTIVES: Array<string> = ['options', 'measure'];

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

  update(code: string, width: number): string {
    const shouldUpdate = this.code !== code || this.width !== width || this.formatted === '';

    this.code = code;
    this.width = width;

    if (shouldUpdate) {
      this._format();
    }

    return this.formatted;
  }

  private _format(): void {
    const buffer: FormatBuffer = this.code.
      split(/\r\n|\r|\n/).
      map(line => line.trim()).
      reduce(this._distributeLines, { options: [], measures: [], lastDirective: null });

    this._updateFormattedWithBuffer(buffer);
  }

  private _distributeLines(buffer: FormatBuffer, line: any): FormatBuffer {
    if (VexFormatter.DIRECTIVES.includes(line)) {
      buffer.lastDirective = line;

      if (line === 'measure') {
        buffer.measures.push({ notes: null, text: null });
      }

      return buffer;
    }

    switch (buffer.lastDirective) {
      case 'options':
        buffer.options.push(line);
        return buffer;

      case 'measure':
        const lastBufferMeasure = last(buffer.measures);

        if (startsWith(line, 'notes')) {
          lastBufferMeasure.notes = line + '\n';
        } else if (startsWith(line, 'text')) {
          lastBufferMeasure.text = line + '\n';
        }

        return buffer;

      default:
        return buffer;
    }
  }

  private _updateFormattedWithBuffer = (buffer: FormatBuffer): void => {
    const options = '\n' + buffer.options.join('\n') + '\n';
    const measures = buffer.measures.map(measure => measure.notes + (measure.text ? measure.text : ''));
    const chunkedMeasures = chunk(measures, this.measuresPerLine).map(measure => measure.join('\n'));

    this.formatted = options + chunkedMeasures.join(options);
  }
}

export default VexFormatter;
