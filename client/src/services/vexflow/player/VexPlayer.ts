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

  bpm: number = 0;
  deadTimeMs: number = 0;
  focus: any = null;
  scrollSpec: any = null;
  tickman: any = null;

  private _currentTimeMs: number = 0;

  get tpm(): number {
    return this.bpm ? this.bpm * (Flow.RESOLUTION / 4) : 0;
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

  set currentTimeMs(currentTimeMs: number) {
    this._currentTimeMs = currentTimeMs;
    this._updateScrollSpec();
  }

  tickVal(timeMs: number): number {
    return this.tpm * ((timeMs / 1000) / 60);
  }

  private _updateScrollSpec(): void {
    if (!this._isScrollSpecValid && this.tickman) {
      this.scrollSpec = this.tickman.scrollSpecFor(this.currentTickVal);
    }
  }

  private _isScrollSpecValid(): boolean {
    return (
      this.scrollSpec &&
      this.scrollSpec.highTick.value > this.currentTickVal &&
      this.scrollSpec.lowTick.value <= this.currentTickVal
    );
  }
}

export default VexPlayer;
