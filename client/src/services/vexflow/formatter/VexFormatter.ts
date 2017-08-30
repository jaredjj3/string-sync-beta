import isBetween from 'util/isBetween';

interface Param {
  key: string;
  value: string;
}

// The purpose of this utility class is to generate nicely
// spaced tablature so that it fits within a certain viewport.

class VexFormatter {
  code: string = '';
  width: number = 0;
  formatted: string = '';

  update(code: string, width: number, elements: Array<any>): string {
    const shouldUpdate = this.code !== code || this.width !== width;

    this.code = code;
    this.width = width;

    if (shouldUpdate) {
      this._format(elements);
    }

    return this.formatted;
  }

  private _format(elements: Array<any>): void {
    debugger
    this.formatted = elements.map(element => this._processElement).join('\n');
  }

  private _processElement(element: any): string {
    if (element.element === 'options') {
      return this._processOptions(element);
    } else if (element.element === 'tabstave') {
      return this._processTabstave(element);
    } else {
      return '';
    }
  }

  private _processOptions(options: any): string {
    return `options ${this._joinParams(options.params)}`;
  }

  private _processTabstave(tabstave: any): string {
    let result = `tabstave ${this._joinParams(tabstave.options)}`;
    
  }

  private _joinParams(params: Array<Param>): string {
    return params.map(({ key, value }) => `${key}=${value}`).join(' ');
  }

  private get _numMeasuresPerStave(): number {
    const { width } = this;

    switch (true) {
      case width <= 576:
        return 1;
      case isBetween(width, 576, 768):
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
}

export default VexFormatter;
