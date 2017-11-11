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
    this.vexPlayer = vexPlayer;
  }

  set artist(artist: Artist) {
    this._artist = artist;
    this.extractor = new VexTickExtractor(artist).extractTicks();
    this._updateTicks();
  }

  set viewport(viewport: any) {
    this._viewport = viewport;
    this._updateTicks();
  }

  scrollSpecFor(tickVal: number): any {

  }

  private _updateTicks(): void {
    this._addOffset();
    this._addLit();
    this._updateScrollSpecs();
  }

  private _addOffset(): void {
    const offset = this.vexPlayer.deadTimeTickVal || 0;
    this.ticks = this.extractor.ticks.map(tick => {
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
    for (let ndx = 0; ndx < this.ticks.length - 1; ndx++) {
      const currTick = this.ticks[ndx];
      const nextTick = this.ticks[ndx + 1];
      this._addScrollSpec(currTick, nextTick);
    }
  }

  private _addScrollSpec(tick1: any, tick2: any): void {
    const [lowTick, highTick] = sortBy([tick1, tick2], tick => tick.value);

    this.scrollSpecs.push({lowTick, highTick });
  }

  private _posFuncFor(lowTick: any, highTick: any): any {

  }
}

export default Tickman;
