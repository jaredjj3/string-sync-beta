import Deconstructor from './deconstructor';

import isBetween from 'util/isBetween';

class VexFormatter {
  static PADDING: number = 20; // px

  process(elements: Array<any>, width: number): string {
    const deconstructed = this._deconstruct(elements);
    const measures = this._reconstruct(deconstructed);

    return measures.map(({ head, body }) => (head + '\n' + body).trim()).join('\n\n');
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
}

export default VexFormatter;
