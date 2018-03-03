import { Line, Measure, Note } from './';
import { VextabParser } from './parser';
import { last } from 'lodash';
import { isBetween } from 'ssUtil';
import { Flow } from 'vexflow';

const { Fraction } = Flow;

class Score {
  measures: Array<Measure> = [];
  lines: Array<Line> = [];
  vextabString: string = '';
  parser: VextabParser = null;
  measuresPerLine: number = 0;
  width: number = 0;

  constructor(vextabString: string, width: number) {
    this.vextabString = vextabString;
    this.width = width;

    this._setup();
  }

  select(line?: number, measure?: number, note?: number): Line | Measure | Note {
    const l = typeof line === 'number';
    const m = typeof measure === 'number';
    const n = typeof note === 'number';

    let result = null;
    let _line = this.lines[line];

    if (l && m && n) {
      const _measure = _line.select(measure) as Measure;
      result = _measure.select(note);
    } else if (l && m) {
      result = _line.select(measure);
    } else if (l) {
      result = _line;
    }

    return result || null;
  }

  hydrateNotes(): void {
    this._setNoteTickStarts();
    this._setNoteTickStops();
    this._computeNoteInterpolators();
  }

  private _setup(): void {
    this.measuresPerLine = this._getMeasuresPerLine(this.width);

    this.parser = new VextabParser(this.vextabString);
    const parsed = this.parser.parse();
    const chunks = this.parser.chunk();
    this._createMeasures(chunks);
    this._createLines();
  }

  private _createLines(): Array<Line> {
    const lines = this._getMeasureGroups().map((measureGroup, lineNumber) =>
      new Line(this, measureGroup, lineNumber, this.width, this.measuresPerLine)
    );

    lines.forEach((line, ndx) => {
      // Create a linked list of lines
      const prev = lines[ndx - 1] || null;
      line.setPrev(prev);

      // Set references to line from measures
      line.measures.forEach(measure => {
        measure.line = line;
      });
    });

    return this.lines = lines;
  }

  private _getMeasuresPerLine(width: number): number {
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

  private _createMeasures(chunks: Array<Vextab.Chunk>): Array<Measure> {
    this.measures = [];

    chunks.forEach(chunk => {
      chunk.vextabStringMeasures.forEach((vextabStringMeasure, ndx) => {
        const measure = new Measure({
          vextabString: vextabStringMeasure,
          vextabOptions: chunk.vextabOptionsString,
          vextabOptionsId: chunk.vextabOptionsId,
          number: this.measures.length + 1
        });

        const prev = last(this.measures) || null;
        measure.setPrev(prev);

        this.measures.push(measure);
      });
    });

    return this.measures;
  }

  private _getMeasureGroups(): Array<Array<Measure>> {
    const measureGroups = [];

    this.measures.forEach(measure => {
      const shouldCreateNewGroup = (
        measureGroups.length === 0 ||
        last(measureGroups).length === this.measuresPerLine ||
        (
          last(measureGroups).length > 0 &&
          last(last(measureGroups)).vextabOptionsId !== measure.vextabOptionsId
        )
      );

      if (shouldCreateNewGroup) {
        measureGroups.push([]);
      }

      last(measureGroups).push(measure);
    });

    return measureGroups;
  }

  private _setNoteTickStarts(): Score {
    const totalTicks = new Fraction(0, 1);

    this.lines.forEach(line => {
      const maxTick = new Fraction(0, 1);

      line.measures.forEach(measure => {
        const totalMeasureTicks = new Fraction(0, 1);

        measure.notes.forEach(note => {
          const absTick = totalTicks.clone();
          note.tickRange.start = absTick.add(totalMeasureTicks).simplify().value();
          if (note.isGraceNote) {
            totalMeasureTicks.add(512, 1);
          } else if (note.getType() === 'note') {
            const noteTicks = note.getTicks();
            let numerator = noteTicks.numerator;
            if (note.prev && note.prev.isGraceNote) {
              numerator -= 512;
            }
            totalMeasureTicks.add(numerator, noteTicks.denominator);
          }
        });

        if (totalMeasureTicks.value() > maxTick.value()) {
          maxTick.copy(totalMeasureTicks);
        }

        totalTicks.add(maxTick);
      });
    });

    return this;
  }

  private _setNoteTickStops(): Score {
    this.lines.forEach(line => {
      line.measures.forEach(measure => {
        measure.notes.forEach(note => {
          if (note.next) {
            note.tickRange.stop = note.next.tickRange.start;
          }
        });
      });
    });

    const lastNote = last(last(last(this.lines).measures).notes) as Note;

    if (lastNote) {
      lastNote.tickRange.stop = Number.MAX_SAFE_INTEGER;
    }

    return this;
  }

  private _computeNoteInterpolators(): Score {
    this.lines.forEach(line => {
      line.measures.forEach(measure => {
        measure.notes.forEach(note => {
          note.computeInterpolator();
        });
      });
    });

    return this;
  }
}

export default Score;
