import VexTickExtractor from './extractor';
import { Artist } from 'services/vexflow';

import { sortBy, forOwn } from 'lodash';
import { interpolateFuncFor } from 'util/interpolate';

class Tickman {
  vexPlayer: any = null;
  extractor: VexTickExtractor = null;
  ticks: Array<any> = [];
  scrollSpecs: Array<any> = [];

  private _artist: Artist = null;
  private _viewport: any = null;

  constructor(vexPlayer: any) {
    // TODO: Get this coupling out of here!
    this.vexPlayer = vexPlayer;
    vexPlayer.tickman = this;
  }

  set artist(artist: Artist) {
    this._artist = artist;
    this.extractor = new VexTickExtractor(artist).extractTicks();
    this.updateTicks();
  }

  set viewport(viewport: any) {
    this._viewport = viewport;
    this.updateTicks();
  }

  scrollSpecFor(tickVal: number): any {
    for (let spec of this.scrollSpecs) {
      if (spec.lowTick.value <= tickVal && spec.highTick.value > tickVal) {
        return spec;
      }
    }

    return null;
  }

  updateTicks(): void {
    if (this._setTicks()) {
      this._addOffset();
      this._addLit();
      this._updateScrollSpecs();
    }
  }

  private _setTicks(): boolean {
    if (this.extractor) {
      this.ticks = this.extractor.ticks.map(tick => Object.assign({}, tick));
      return true;
    } else {
      return false;
    }
  }

  private _addOffset(): void {
    const offset = this.vexPlayer.deadTimeTickVal || 0;
    this.ticks = this.ticks.map(tick => {
      const nextTick = Object.assign({}, tick);
      nextTick.value += offset;
      return nextTick;
    });
  }

  private _addLit(): void {
    let tickIndex = 0;
    let measureIndex = 0;
    let litTicks = [];

    while (tickIndex < this.ticks.length) {
      const tick = this.ticks[tickIndex];

      if (tick.measureIndex === measureIndex) {
        litTicks.push(tick);
      } else {
        const litPositions = this._extractLitPositions(litTicks);
        litTicks.forEach(litTick => litTick.lit = litPositions);
        litTicks = [tick];
        measureIndex = tick.measureIndex;
      }

      tickIndex++;
    }
  }

  private _extractLitPositions(litTicks: Array<any>): Array<any> {
    const stringsByFret = {};
    litTicks.forEach(({ pressed }) => {
      pressed.forEach(({ str, fret }) => {
        stringsByFret[fret] = stringsByFret[fret] || new Set();
        stringsByFret[fret].add(str);
      });
    });

    const litPositions = [];
    forOwn(stringsByFret, (strings, fret) => {
      strings.forEach(str => litPositions.push({ str, fret }));
    });

    return litPositions;
  }

  private _updateScrollSpecs(): void {
    // skip the last tick
    this.scrollSpecs = [];

    for (let ndx = 0; ndx < this.ticks.length - 1; ndx++) {
      const currTick = this.ticks[ndx];
      const nextTick = this.ticks[ndx + 1];
      this._addScrollSpec(currTick, nextTick);
    }
  }

  private _addScrollSpec(tick1: any, tick2: any): void {
    const [lowTick, highTick] = sortBy([tick1, tick2], tick => tick.value);
    const posFunc = this._posFuncFor(lowTick, highTick);
    this.scrollSpecs.push({ lowTick, highTick, posFunc });
  }

  private _posFuncFor(lowTick: any, highTick: any): Function {
    const lowPos = lowTick.posX;
    const highPos = this._highPosFor(lowTick, highTick);
    return interpolateFuncFor(lowTick.value, highTick.value, lowPos, highPos);
  }

  private _highPosFor(lowTick: any, highTick: any): number {
    if (lowTick.staveIndex === highTick.staveIndex) {
      return highTick.posX;
    } else {
      return this._viewport ? this._viewport.width - 40 : window.innerWidth;
    }
  }
}

export default Tickman;
