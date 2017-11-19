import { Flow } from 'services/vexflow';

// The VexPlayer's sole responsibility is to orchestrate the output
// from the VexParser and sync it with the currentTime member variable.
class VexPlayer {
  static DEFAULT_NOTE_STYLE: any = {
    fillStyle: '#000000',
    strokeStyle: '#000000'
  };

  static PRESSED_NOTE_STYLE: any = {
    fillStyle: '#FF0000',
    strokeStyle: '#FF0000'
  };

  scrollSpec: any = null;
  tickman: any = null;

  private _bpm: number = 0;
  private _deadTimeMs: number = 0;
  private _currentTimeMs: number = 0;

  get tpm(): number {
    return this._bpm ? this._bpm * (Flow.RESOLUTION / 4) : 0;
  }

  get deadTimeMs(): number {
    return this._deadTimeMs;
  }

  get deadTimeTickVal(): number {
    return this.deadTimeMs ? this.tickVal(this.deadTimeMs) : 0;
  }

  get currentTickVal(): number {
    return this._currentTimeMs ? this.tickVal(this._currentTimeMs) : 0;
  }

  get caretPosX(): number {
    return this.scrollSpec ? this.scrollSpec.posFunc(this.currentTickVal) : 0;
  }

  get currentTimeMs(): number {
    return this._currentTimeMs;
  }

  set currentTimeMs(currentTimeMs: number) {
    this._currentTimeMs = currentTimeMs;
    this._updateScrollSpec();
  }

  set deadTimeMs(deadTimeMs: number) {
    this._deadTimeMs = deadTimeMs;
    this.tickman.updateTicks();
  }

  set bpm(bpm: number) {
    this._bpm = bpm;
    this.tickman.updateTicks();
  }

  tickVal(timeMs: number): number {
    return this.tpm * ((timeMs / 1000) / 60);
  }

  private _updateScrollSpec(): void {
    if (!this._isScrollSpecValid() && this.tickman) {
      this._drawTickNotes(VexPlayer.DEFAULT_NOTE_STYLE);
      this.scrollSpec = this.tickman.scrollSpecFor(this.currentTickVal);
      this._drawTickNotes(VexPlayer.PRESSED_NOTE_STYLE);
    }
  }

  private _drawTickNotes(style: any): void {
    if (!this.scrollSpec) {
      return;
    }

    const tick = this.scrollSpec.lowTick;

    tick.notes.forEach(note => {
      note.setStyle(style);
      note.setLedgerLineStyle(style);
    });

    tick.notes[0].drawNoteHeads();
    tick.notes[0].drawLedgerLines();

    // style and draw tabNotes
    const ctx = tick.tabNotes[0].context;
    ctx.save();

    const { fillStyle, strokeStyle } = style;

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
    }

    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
    }

    tick.tabNotes.forEach(tabNote => {
      try {
        tabNote.drawPositions();
      } catch (e) { }
    });
    ctx.restore();
  }

  private _isScrollSpecValid(): boolean {
    const { currentTickVal } = this;

    if (this.scrollSpec) {
      return (
        this.scrollSpec.highTick.value > currentTickVal &&
        this.scrollSpec.lowTick.value <= currentTickVal
      );
    } else {
      return false;
    }
  }
}

export default VexPlayer;
