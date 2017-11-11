import Flow from 'services/vexflow/flow';
import Artist from 'services/vexflow/artist';

import { has, sortBy, values, last } from 'lodash';

const { Fraction } = Flow;

const sortTicks = (ticks: Array<any>): Array<any> => {
  return sortBy(values(ticks), tick => tick.value);
};

class VexTickExtractor {
  voices: Array<any> = [];
  tabVoices: Array<any> = [];
  ticks: Array<any> = [];

  private _barTicks: Array<any> = [];

  constructor(artist: Artist) {
    this.artist = artist;
  }

  set artist(artist: Artist) {
    this.voices = artist.getPlayerData().voices;
    this.tabVoices = artist.staves.map(stave => stave.tab_voices);
  }

  extractTicks(): VexTickExtractor {
    this._resetTicks();

    let totalTicks = new Fraction(0, 1);

    this.voices.forEach((voiceGroup, voiceGroupIndex) => {
      let maxVoiceTick = new Fraction(0, 1);
      voiceGroup.forEach((voice, voiceIndex) => {
        let totalVoiceTicks = new Fraction(0, 1);
        voice.getTickables().forEach((note, tickIndex) => {
          const absTick = this._absTick(totalTicks, totalVoiceTicks);
          const tabNote = this._tabNote(voiceGroupIndex, voiceIndex, tickIndex);
          const noteTicks = note.getTicks();
          const lastTick = last(this.ticks);
          const pressed = tabNote.positions || (lastTick && lastTick.positions) || [];
          this._addTick({
            type: this._tickType(note),
            value: absTick.value(),
            notes: [note],
            tabNotes: [tabNote],
            staveIndex: voiceGroupIndex,
            noteIndex: tickIndex,
            pressed
          });

          totalVoiceTicks.add(noteTicks.numerator, noteTicks.denominator);
        });
        if (totalVoiceTicks.value() > maxVoiceTick.value()) {
          maxVoiceTick.copy(totalVoiceTicks);
        }
      });
      totalTicks.add(maxVoiceTick);
    });

    this.ticks = sortTicks(this.ticks);
    return this;
  }

  private _resetTicks(): void {
    this.ticks = [];
    this._barTicks = [];
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
  // their measureIndex property. We split up the logic using
  // this method to delegate to _addNoteTick or _addBarTick.
  private _addTick(tickSpec: any): any {
    switch (tickSpec.type) {
      case 'note':
        return this._addNoteTick(tickSpec);
      case 'bar':
        return this._addBarTick(tickSpec);
      default:
        return;
    }
  }

  private _addNoteTick(tickSpec: any): any {
    const measureIndex = Math.max(this._barTicks.length - 1, 0);
    const tick = Object.assign({}, tickSpec, { measureIndex });

    const lastTick = last(this.ticks);
    if (lastTick && lastTick.value === tick.value) {
      lastTick.notes.concat(tick.notes);
      lastTick.tabNotes.concat(tick.tabNote);
    } else {
      this.ticks.push(tick);
    }

    return tick;
  }

  private _addBarTick(tickSpec: any): any {
    const measureIndex = this._barTicks.length;
    const tick = Object.assign({}, tickSpec, { measureIndex });
    this.ticks.push(tick);
    this._barTicks.push(tick);
    return tick;
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

export default VexTickExtractor;
