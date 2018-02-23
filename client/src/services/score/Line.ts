import { Artist, Measure, Note, DirectiveObject } from 'services';
import Linker from './Linker';
import { ScoreLineRenderer, LoopCaretRenderer, CaretRenderer, Score } from 'services';
import { last } from 'lodash';

class Line {
  static MAX_MEASURE_LENGTH: number = 400;

  score: Score = null;
  measures: Array<Measure> = [];
  targetNumMeasures: number = null;
  vextabString: string = '';
  number: number = null;
  width: number = null;
  height: number = null;
  prev: Line = null;
  next: Line = null;
  tabStave: any = null;
  noteStave: any = null;
  linker: Linker = null;
  scoreLineRenderer: ScoreLineRenderer = null;
  caretRenderer: CaretRenderer = null;
  loopCaretRenderer: LoopCaretRenderer = null;

  constructor(score: Score, measures: Array<Measure>, number: number, width: number, targetNumMeasures: number) {
    this.score = score;
    this.measures = measures;
    this.number = number;
    this.width = width;
    this.height = 300;
    this.targetNumMeasures = targetNumMeasures;

    this._extractVextabString();
  }

  get isLast(): boolean {
    return this.next === null;
  }

  setPrev(prev: Line): Line {
    this.prev = prev;

    if (prev) {
      prev.next = this;
    }

    return prev;
  }

  setNext(next: Line): Line {
    next.setPrev(this);
    return next;
  }

  linkVexInstances(stave: any): Linker {
    this.linker = new Linker(this, stave);
    this.linker.link();
    return this.linker;
  }

  unlinkVexInstances(): void {
    if (this.linker) {
      this.linker.unlink();
      this.linker = null;
    }
  }

  select(measure?: number, note?: number): Measure | Note {
    const m = typeof measure === 'number';
    const n = typeof note === 'number';

    let result = null;
    const _measure = this.measures[measure];

    if (m && n) {
      result = _measure.select(note);
    } else if (m) {
      result = _measure;
    }

    return result || null;
  }

  getTickRange(): NumRange {
    const startNote = this.select(0, 0) as Note;
    const stopNote = last(last(this.measures).notes);

    return {
      start: startNote ? startNote.tickRange.start : 0,
      stop: stopNote ? stopNote.tickRange.stop : 0
    };
  }

  private _extractVextabString(): string {
    const options = { id: null, string: null };
    let buffer = [];
    const vextabStrings = [];

    this.measures.forEach(measure => {
      if (measure.vextabOptionsId !== options.id) {
        if (options.string) {
          // purge string from buffer
          const optionsString = this._addWidthToOptions(options.string);
          vextabStrings.push(optionsString + '\n\n' + buffer.join('\n') + '\n\n');
          buffer = [];
        }

        options.id = measure.vextabOptionsId;
        options.string = measure.vextabOptions;
      }

      buffer.push(measure.vextabString);
    });

    // purge the last buffer
    const optionsString = this._addWidthToOptions(options.string);
    vextabStrings.push(optionsString + '\n\n' + buffer.join('\n'));

    return this.vextabString = vextabStrings.join('\n');
  }

  private _addWidthToOptions(optionsString: string): string {
    const { MAX_MEASURE_LENGTH } = Line;
    const numMeasures = this.measures.length;
    const pxPerMeasure = this.width / numMeasures;

    if (this.targetNumMeasures > 1 && pxPerMeasure > MAX_MEASURE_LENGTH) {
      const targetWidth = numMeasures * MAX_MEASURE_LENGTH;
      return `options width=${targetWidth}\n${optionsString}`;
    } else {
      return optionsString;
    }
  }
}

export default Line;
