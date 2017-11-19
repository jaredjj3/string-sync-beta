import {
  Formatter, Fretman, VexPlayer as Player,
  ScaleVisualizer, Tickman
} from '../';

// The VexProvider is to provide a simple interface for manipulating
// the Vexflow services. If a notation property is updated, the internal
// properties are updated the next time they are accessed.
class VexProvider {
  isReady: boolean;

  private _vextab: string;
  private _bpm: number;
  private _deadTime: number;
  private _viewportWidth: number;
  private _lines: Array<any>;
  private _measures: Array<any>;
  private _notes: Array<any>;
  private _fretman: Fretman;
  private _formatter: Formatter;
  private _player: Player;
  private _scaleman: ScaleVisualizer;
  private _tickman: Tickman;

  constructor() {
    this._vextab = '';
    this.reset();
  }

  // Setting the vextab, deadTime, bpm, or viewportWidth are
  // the entrypoints for triggering an internal state reset.
  set vextab(vextab: string) {
    this._vextab = vextab;
    this.reset();
  }

  set bpm(bpm: number) {
    this._bpm = bpm;
    this.reset();
  }

  set deadTime(deadTime: number) {
    this._deadTime = deadTime;
    this.reset();
  }

  set viewportWidth(viewportWidth: number) {
    this._viewportWidth = viewportWidth;
    this.reset();
  }

  get lines(): Array<any> {
    this._setup();
    return this._lines;
  }

  get measures(): Array<any> {
    this._setup();
    return this._measures;
  }

  get notes(): Array<any> {
    this._setup();
    return this._notes;
  }

  reset(): void {
    this.isReady     = false;
    this._lines      = [];
    this._measures   = [];
    this._notes      = [];
    this._fretman    = new Fretman();
    this._formatter  = new Formatter();
    this._player     = new Player();
    this._scaleman   = new ScaleVisualizer(this._fretman);
    this._tickman    = new Tickman(this._player);
  }

  private _setup(): boolean {
    if (this.isReady) {
      return true;
    }

    return this.isReady = true;
  }
}

export default VexProvider;
