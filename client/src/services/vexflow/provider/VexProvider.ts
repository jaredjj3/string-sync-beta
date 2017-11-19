import {
  Formatter, Fretman, VexPlayer as Player,
  ScaleVisualizer, Tickman, Artist, VexTab
} from '../';

// The VexProvider is to provide a simple interface for manipulating
// the Vexflow services. If a notation property is updated, the internal
// properties are updated the next time they are accessed.
class VexProvider {
  isReady: boolean;
  parseError: string;
  afterSetup: Function;

  private _vextab: string;
  private _bpm: number;
  private _deadTime: number;
  private _currentTimeMs: number;
  private _viewportWidth: number;
  private _lines: Array<any>;
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

  set currentTimeMs(currentTimeMs: number) {
    this._currentTimeMs = currentTimeMs;
    this._player.currentTimeMs = currentTimeMs;
  }

  get lines(): Array<any> {
    this.setup();
    return this._lines;
  }

  get shouldTrySetup(): boolean {
    return (
      this._vextab.length > 0 &&
      this._bpm > 0 &&
      typeof this._deadTime === 'number' &&
      this._viewportWidth > 0
    );
  }

  reset(): void {
    this.isReady    = false;
    this.parseError = null;
    this._lines     = [];
    this._fretman   = new Fretman();
    this._formatter = new Formatter();
    this._player    = new Player();
    this._scaleman  = new ScaleVisualizer(this._fretman);
    this._tickman   = new Tickman(this._player);
  }

  setup(): boolean {
    if (this.isReady) {
      return true;
    }

    this.isReady = (
      this.shouldTrySetup    &&
      this._setupFormatter() &&
      this._setupLines()     &&
      this._setupTickman()
    );

    if (this.isReady && typeof this.afterSetup === 'function') {
      this.afterSetup();
    }

    return this.isReady;
  }

  private _setupFormatter(): boolean {
    const artist = new Artist(0, 0, this._viewportWidth);
    const tab = new VexTab(artist);

    try {
      this._formatter.process(tab.elements);
      this.parseError = null;
      return true;
    } catch (error) {
      this.parseError = error.message;
      return false;
    }
  }

  private _setupLines(): boolean {
    const { measureChunks } = this._formatter;

    try {
      this._lines = measureChunks.map(measureChunk => {
        let vextabStr = '';
        vextabStr += ('\n' + measureChunk[0].head + '\n');
        vextabStr += measureChunk.map(measure => measure.body).join('\n');

        const artist = new Artist(10, 20, this.viewportWidth - 50, { tab_stave_lower_spacing: 300 });
        const vextab = new VexTab(artist);

        vextab.parse(vextabStr);
        return { artist, vextab };
      });

      this.parseError = null;
      return true;
    } catch (error) {
      this.parseError = error.message;
      return false;
    }
  }

  private _setupTickman(): boolean {
    try {
      this._player.deadTimeMs = this._deadTime * 1000;
      this._player.bpm = this._bpm;
      this.parseError = null;
      return true;
    } catch (error) {
      this.parseError = error.message;
      return false;
    }
  }
}

export default VexProvider;
