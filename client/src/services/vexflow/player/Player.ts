import { VideoPlayer } from 'types/videoPlayer';
import Artist from '../artist';
import Flow from '../flow';
import { has, sortBy, values } from 'lodash';

import isBetween from 'util/isBetween';
import { interpolateFuncFor } from 'util/interpolate';

import { Viewport } from 'types/device';

const { Fraction } = Flow;

class Player {
  tickNotes: any = {};
  allTicks: Array<any> = [];
  currTick: any = null;

  private _isDirty: boolean = false;
  private _videoPlayer: VideoPlayer;
  private _artist: Artist;
  private _tempo: number = 120; // bpm TODO: REMOVE DEFAULT
  private _viewport: Viewport;

  get isReady(): boolean {
    return this._videoPlayer && this._artist && !this._isDirty;
  }

  set videoPlayer(videoPlayer: VideoPlayer) {
    this._videoPlayer  = videoPlayer;
    this._isDirty = true;
  }

  set artist(artist: Artist) {
    this._artist = artist;
    artist.attachPlayer(this);
    this._isDirty = true;
  }

  set tempo(tempo: number) {
    this._tempo = tempo;
    this._isDirty = true;
  }

  // ticks per minute
  get tpm(): number {
    return this._tempo ? this._tempo * (Flow.RESOLUTION / 4) : 0;
  }

  caretPosX(): number {
    if (this._isDirty && !this.prepare()) {
      return 0;
    }

    const currentTime = this._videoPlayer.getCurrentTime() / 60; // minutes
    const currentTickNum = this.tpm * currentTime;

    const shouldReassignCurrTick = (
      !this.currTick ||
      !isBetween(currentTickNum, this.currTick.lowTick, this.currTick.highTick)
    );

    if (shouldReassignCurrTick) {
      this.currTick = this.calcCurrTick(currentTickNum);
    }

    if (this.currTick) {
      return this.currTick.posFunc(currentTickNum);
    } else {
      return 0;
    }
  }

  // https://github.com/0xfe/vextab/blob/master/src/player.coffee#L134-L162
  prepare(): boolean {
    if (!this._artist || !this._tempo) {
      return false;
    }

    let totalTicks = new Fraction(0, 1);

    for (let voiceGroup of this._artist.getPlayerData().voices) {
      let maxVoiceTick = new Fraction(0, 1);

      for (let voice of voiceGroup) {
        let totalVoiceTicks = new Fraction(0, 1);

        for (let note of voice.getTickables()) {
          if (!note.shouldIgnoreTicks()) {
            const absTick = totalTicks.clone();
            absTick.add(totalVoiceTicks);
            absTick.simplify();

            const key = absTick.toString();
            if (has(this.tickNotes, key)) {
              this.tickNotes[key].notes.push(note);
            } else {
              this.tickNotes[key] = {
                tick: absTick,
                value: absTick.value(),
                notes: [note]
              };
            }

            const noteTicks = note.getTicks();
            totalVoiceTicks.add(noteTicks.numerator, noteTicks.denominator);
          }
        }

        if (totalVoiceTicks.value() > maxVoiceTick.value()) {
          maxVoiceTick.copy(totalVoiceTicks);
        }
      }

      totalTicks.add(maxVoiceTick);
    }

    this.allTicks = sortBy(values(this.tickNotes), tick => tick.value);
    this._isDirty = false;
    return true;
  }

  private calcCurrTick(probeTick: number): any {
    // skip last tick
    for (let i = 0; i < this.allTicks.length - 1; i++) {
      const curr = this.allTicks[i];
      const next = this.allTicks[i + 1];

      if (isBetween(probeTick, curr.value, next.value)) {
        return this.currTickObj(curr, next);
      }
    }

    return null;
  }

  private currTickObj(tick1: any, tick2: any): any {
    const lowTick  = tick1.value;
    const highTick = tick2.value;
    const lowPos   = tick1.notes[0].getBoundingBox().x;
    const highPos  = tick2.notes[0].getBoundingBox().x;
    const posFunc  = interpolateFuncFor(lowTick, highTick, lowPos, highPos);
    const tickFunc = interpolateFuncFor(lowPos, highPos, lowTick, highTick);

    return { lowTick, highTick, lowPos, highPos, posFunc, tickFunc };
  }
}

export default Player;
