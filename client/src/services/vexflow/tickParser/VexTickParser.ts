import Flow from 'services/vexflow/flow';
import Artist from 'services/vexflow/artist';

import { has, sortBy, values } from 'lodash';

const { Fraction } = Flow;

const sortTicks = (ticks: Array<any>): Array<any> => {
  return sortBy(values(ticks), tick => tick.value);
};

class VexTickParser {
  voices: Array<any> = [];
  tabVoices: Array<any> = [];
  ticks: Array<any> = [];

  private _barTicks: Array<any> = [];

  constructor(artist: Artist, offsetMs: number) {
    this.artist = artist;
  }

  set artist(artist: Artist) {
    this.voices = artist.getPlayerData().voices;
    this.tabVoices = artist.staves.map(stave => stave.tab_voices);
  }

  resetTicks(): void {
    this.ticks = [];
    this._barTicks = [];
  }

  extractTicks(): void {
    this.resetTicks();

    let totalTicks = new Fraction(0, 1);

    this.voices.forEach((voiceGroup, voiceGroupIndex) => {
      let maxVoiceTick = new Fraction(0, 1);
      voiceGroup.forEach((voice, voiceIndex) => {
        let totalVoiceTicks = new Fraction(0, 1);
        voice.getTickables().forEach((note, tickIndex) => {
          const absTick = this._absTick(totalTicks, totalVoiceTicks);
          const tabNote = this._tabNote(voiceGroupIndex, voiceIndex, tickIndex);
          this._addTick({
            type: this._tickType(note),
            tick: absTick,
            value: absTick.value(),
            notes: [note],
            tabNotes: [tabNote],
            staveIndex: voiceGroupIndex,
            noteIndex: tickIndex
          });
        });
        if (totalVoiceTicks.value() > maxVoiceTick.value()) {
          maxVoiceTick.copy(totalVoiceTicks);
        }
      });
      totalTicks.add(maxVoiceTick);
    });

    this.ticks = sortTicks(this.ticks);
  }

  private _tickType(note: any): string {
    if (!note.shouldIgnoreTicks()) {
      return 'note';
    } else if (note.getDuration() === 'b') {
      return 'bar';
    } else {
      return 'skip';
    }
  }

  // Note and bar ticks have different ways of calculating
  // their measureNum property. We split up the logic using
  // this method to delegate to _addNoteTick or _addBarTick.
  private _addTick(tickSpec: any): void {
    switch (tickSpec.type) {
      case 'note':
        this._addNoteTick(tickSpec);
        return;
      case 'bar':
        this._addBarTick(tickSpec);
        return;
      default:
        return;
    }
  }

  private _addNoteTick(tickSpec: any): void {
    const measureNum = Math.max(this._barTicks.length - 1, 0);
    const tick = Object.assign({}, tickSpec, { measureNum });
    this.ticks.push(tick);
  }

  private _addBarTick(tickSpec: any): void {
    const measureNum = this._barTicks.length;
    const tick = Object.assign({}, tickSpec, { measureNum });
    this.ticks.push(tick);
    this._barTicks.push(tick);
  }

  private _absTick(totalTicks: any, totalVoiceTicks: any): any {
    const absTick = totalTicks.clone();
    absTick.add(totalVoiceTicks);
    return absTick.simplify();
  }

  private _tabNote(voiceGroupIndex: number, voiceIndex: number, tickIndex: number): any {
    return this.tabVoices[voiceGroupIndex][voiceIndex][tickIndex];
  }
}

export default VexTickParser;
