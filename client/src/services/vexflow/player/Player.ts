import React from 'react';
import { VideoPlayer } from 'types/videoPlayer';
import Artist from '../artist';
import Flow from '../flow';
import { has, sortBy, values, isEqual, flatMap } from 'lodash';

import isBetween from 'util/isBetween';
import { interpolateFuncFor } from 'util/interpolate';

import { Viewport } from 'types/device';

const { Fraction } = Flow;

interface NoteStyle {
  fillStyle?: string,
  strokeStyle?: string
}

class Player {
  static DEFAULT_NOTE_STYLE: any = {
    fillStyle: '#000000',
    strokeStyle: '#000000'
  };

  static PRESSED_NOTE_STYLE: any = {
    fillStyle: '#FF0000',
    strokeStyle: '#FF0000'
  };

  tickNotes: any = {};
  allTicks: Array<any> = [];
  barTicks: Array<any> = [];
  currTick: any = null;
  loopSliderMarks: any = {};

  private _loopSlider: any;
  private _isDirty: boolean = false;
  private _videoPlayer: VideoPlayer = null;
  private _artist: Artist = null;
  private _deadTime: number = 0; // ms
  private _tempo: number = 60;
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

  set loopSlider(loopSlider: any) {
    this._loopSlider = loopSlider;

    if (loopSlider && this.isReady) {
      loopSlider.setMarks(this.loopSliderMarks);
    } else {
      this.prepare();
    }
  }

  get loopSlider(): any {
    return this._loopSlider;
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

      // Ensure that the currTick that is about to get replaced
      // is redrawn to be black.
      if (this.currTick) {
        this._drawTickNotes(this.currTick, Player.DEFAULT_NOTE_STYLE);
      }

      // Get a new currTick
      this.currTick = this.calcCurrTick(currentTickNum);

      // Draw the notes to be the pressed style if a currTick object
      // is successfully created.
      if (this.currTick) {
        this._drawTickNotes(this.currTick, Player.PRESSED_NOTE_STYLE);
      }
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

    this.barTicks = [];
    this.allTicks = [];
    let totalTicks = new Fraction(0, 1);
    const voiceGroups = this._artist.getPlayerData().voices;
    const tabVoices = this._artist.staves.map(stave => stave.tab_voices);

    voiceGroups.forEach((voiceGroup, voiceGroupIndex) => {
      let maxVoiceTick = new Fraction(0, 1);

      voiceGroup.forEach((voice, voiceIndex) => {
        let totalVoiceTicks = new Fraction(0, 1);

        voice.getTickables().forEach((note, tickIndex) => {
          const tabNote = tabVoices[voiceGroupIndex][voiceIndex][tickIndex];
          const absTick = totalTicks.clone();
          absTick.add(totalVoiceTicks);
          absTick.simplify();

          if (!note.shouldIgnoreTicks()) {
            const key = absTick.toString();
            if (has(this.tickNotes, key)) {
              this.tickNotes[key].notes.push(note);
              this.tickNotes[key].tabNotes.push(tabNote);
            } else {
              this.tickNotes[key] = {
                tick: absTick,
                value: absTick.value(),
                notes: [note],
                tabNotes: [tabNote],
                stave: voiceGroupIndex
              };
            }

            const noteTicks = note.getTicks();
            totalVoiceTicks.add(noteTicks.numerator, noteTicks.denominator);
          } else if (note.constructor.name === 'BarNote') {
            this.barTicks.push({
              tick: absTick,
              value: absTick.value(),
              notes: [note],
              tabNotes: [tabNote],
              stave: voiceGroupIndex
            });
          }
        });

        if (totalVoiceTicks.value() > maxVoiceTick.value()) {
          maxVoiceTick.copy(totalVoiceTicks);
        }
      });

      totalTicks.add(maxVoiceTick);
    });

    this.allTicks = sortBy(values(this.tickNotes), tick => tick.value);
    const offset = ((this._deadTime / 1000) / 60) * this.tpm;

    if (offset !== 0) {
      this.allTicks = this.allTicks.map(tick => {
        const nextTick = Object.assign({}, tick);
        nextTick.value += offset;
        return nextTick;
      });

      this.barTicks = this.barTicks.map(tick => {
        const nextTick = Object.assign({}, tick);
        nextTick.value += offset;
        return nextTick;
      });

      this.allTicks.unshift(Object.assign({}, this.allTicks[0], { value: 0 }));
      this.barTicks.unshift(Object.assign({}, this.barTicks[0], { value: 0 }));
    }

    if (this.loopSlider) {
      this.calcLoopSliderMarks();
      this.loopSlider.setMarks(this.loopSliderMarks);
    }

    this._isDirty = false;
    return true;
  }

  private calcLoopSliderMarks(): void {
    const allTickValues = this.allTicks.
      map(tick => tick.value).
      concat(this.barTicks.map(tick => tick.value));

    const maxTickValue = Math.max(...allTickValues);

    this.loopSliderMarks = this.barTicks.reduce((loopSliderMarks, tick) => {
      const normalizedTickValue = (tick.value / maxTickValue) * 100;
      loopSliderMarks[normalizedTickValue] = '';
      return loopSliderMarks;
    }, {});

    this.loopSliderMarks['100'] = '';

    return this.loopSliderMarks;
  }

  private _drawTickNotes(tick: any, style: NoteStyle = Player.DEFAULT_NOTE_STYLE): void {
    // style and draw staveNotes
    tick.lowStaveNotes.forEach(note => note.setStyle(style));
    tick.lowStaveNotes[0].draw();

    // style and draw tabNotes
    const ctx = tick.lowTabNotes[0].context;
    ctx.save();

    const { fillStyle, strokeStyle } = style;

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }

    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
    }

    tick.lowTabNotes.forEach(tabNote => tabNote.draw());
    ctx.restore();
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

    const staves = [tick1.stave, tick2.stave];
    const stave = Math.min(...staves);

    const tickObjSpec = { lowTick, highTick, lowPos, highPos };

    const posFunc = this.posFuncFor(tick1, tick2, tickObjSpec);
    // TODO: implement const tickFunc = interpolateFuncFor(lowPos, highPos, lowTick, highTick);

    const pressed = flatMap(tick1.tabNotes, tabNote => tabNote.positions);
    const lit = flatMap(tick2.tabNotes, tabNote => tabNote.positions);

    const lowStaveNotes = tick1.notes;
    const lowTabNotes = tick1.tabNotes;

    return { lowTick, highTick, lowPos, highPos, posFunc, stave, pressed, lit, lowStaveNotes, lowTabNotes };
  }

  private posFuncFor(tick1: any, tick2: any, spec: any): Function {
    let highPos = spec.highPos;

    if (tick1.stave !== tick2.stave) {
      highPos = this._viewport.width - 10;
    }

    return interpolateFuncFor(spec.lowTick, spec.highTick, spec.lowPos, highPos);
  }
}

export default Player;
