import { VideoPlayer } from 'types/videoPlayer';
import Artist from '../artist';
import Flow from '../flow';
import { has, sortBy, values, isEqual } from 'lodash';

import isBetween from 'util/isBetween';
import { interpolateFuncFor } from 'util/interpolate';

import { Viewport } from 'types/device';

const { Fraction } = Flow;

class Player {
  tickNotes: any = {};
  allTicks: Array<any> = [];
  currTick: any = null;

  private _isDirty: boolean = false;
  private _videoPlayer: VideoPlayer = null;
  private _artist: Artist = null;
  private _deadTime: number = 0; // ms
  private _tempo: number = 100; // bpm TODO: remove default
  private _viewport: Viewport = null;

  get isReady(): boolean {
    return this._videoPlayer && this._artist && this._viewport && !this._isDirty;
  }

  set videoPlayer(videoPlayer: VideoPlayer) {
    this._isDirty = this._isDirty || this._videoPlayer !== videoPlayer;
    this._videoPlayer  = videoPlayer;
  }

  set artist(artist: Artist) {
    this._isDirty = this._isDirty || this._artist !== artist;
    this._artist = artist;
    artist.attachPlayer(this);
  }

  set tempo(tempo: number) {
    this._isDirty = this._isDirty || this._tempo !== tempo;
    this._tempo = tempo;
  }

  set viewport(viewport: Viewport) {
    this._isDirty = this._isDirty || !isEqual(this._viewport, viewport);
    this._viewport = viewport;
  }

  set deadTime(deadTime: number) {
    this._isDirty = this._isDirty || this._deadTime !== deadTime;
    this._deadTime = deadTime;
  }

  // ticks per minute
  get tpm(): number {
    return this._tempo ? this._tempo * (Flow.RESOLUTION / 4) : 0;
  }

  caretPosX(): number {
    if (this._isDirty) {
      this.prepare();
    }

    if (!this.isReady) {
      throw 'Player is not ready. See Player.isReady.';
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
      return null;
    }
  }

  // https://github.com/0xfe/vextab/blob/master/src/player.coffee#L134-L162
  prepare(): boolean {
    if (!this._artist || !this._tempo) {
      return false;
    }

    let totalTicks = new Fraction(0, 1);
    const voiceGroups = this._artist.getPlayerData().voices;

    voiceGroups.forEach((voiceGroup, measure) => {
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
                notes: [note],
                measure
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
    });

    this.allTicks = sortBy(values(this.tickNotes), tick => tick.value);
    const offset = ((this._deadTime / 1000) / 60) * this.tpm;
    this.allTicks = this.allTicks.map(tick => {
      tick.value += offset;
      return tick;
    });

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
    const values = [tick1.value, tick2.value];
    const [lowTick, highTick]  = values;

    const positions = [tick1.notes[0].getBoundingBox().x, tick2.notes[0].getBoundingBox().x];
    const [lowPos, highPos] = positions;

    const measures = [tick1.measure, tick2.measure];
    const measure  = Math.min(...measures);

    const tickObjSpec = { lowTick, highTick, lowPos, highPos };

    const posFunc = this.posFuncFor(tick1, tick2, tickObjSpec);
    // TODO: implement const tickFunc = interpolateFuncFor(lowPos, highPos, lowTick, highTick);

    return { lowTick, highTick, lowPos, highPos, posFunc, measure };
  }

  private posFuncFor(tick1: any, tick2: any, spec: any): Function {
    let highPos = spec.highPos;

    if (tick1.measure !== tick2.measure) {
      highPos = this._viewport.width - 10;
    }

    return interpolateFuncFor(spec.lowTick, spec.highTick, spec.lowPos, highPos);
  }
}

export default Player;
