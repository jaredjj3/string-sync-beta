import {
  Formatter, Fretman, VexPlayer as Player,
  ScaleVisualizer, Tickman, Artist, VexTab,
  Flow
} from '../';
import { flatMap } from 'lodash';

// The VexProvider is to provide a simple interface for manipulating
// the Vexflow services. If a notation property is updated, the internal
// properties are updated the next time they are accessed.
class VexProvider {
  isReady: boolean;
  parseError: string;
  afterSetup: Function;

  vextabs: Array<any>;
  fretman: Fretman;
  formatter: Formatter;
  player: Player;
  scaleman: ScaleVisualizer;
  tickman: Tickman;

  private _vextab: string;
  private _bpm: number;
  private _deadTime: number;
  private _currentTimeMs: number;
  private _viewportWidth: number;

  constructor() {
    this._vextab = '';
    this.reset();
  }

  // Setting the vextab, deadTime, bpm, or viewportWidth are
  // the entrypoints for triggering an internal state reset.
  set vextab(vextab: string) {
    if (this._vextab !== vextab) {
      this.reset();
    }

    this._vextab = vextab;
  }

  set bpm(bpm: number) {
    if (this._bpm !== bpm) {
      this.reset();
    }

    this._bpm = bpm;
  }

  set deadTime(deadTime: number) {
    if (this._deadTime !== deadTime) {
      this.reset();
    }

    this._deadTime = deadTime;
  }

  set viewportWidth(viewportWidth: number) {
    if (this._viewportWidth !== viewportWidth) {
      this.reset();
    }

    this._viewportWidth = viewportWidth;
  }

  set currentTimeMs(currentTimeMs: number) {
    this._currentTimeMs = currentTimeMs;
    this.player.currentTimeMs = currentTimeMs;
  }

  get lines(): Array<any> {
    this.setup();
    return this.vextabs;
  }

  get shouldTrySetup(): boolean {
    return (
      this._vextab.length > 0 &&
      this._bpm > 0 &&
      typeof this._deadTime === 'number' &&
      this._viewportWidth > 0
    );
  }

  updateFretmanWithPlayer(): void {
    this.fretman.updateWithPlayer(this.player);
  }

  noteAt(pos: any): void {
    this.scaleman.noteAt(pos);
  }

  reset(): void {
    this.isReady    = false;
    this.parseError = null;
    this.vextabs    = [];
    this.fretman    = new Fretman();
    this.formatter  = new Formatter();
    this.player     = new Player();
    this.scaleman   = new ScaleVisualizer(this.fretman);
    this.tickman    = new Tickman(this.player);
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
      this.parseError = null;
      this.afterSetup();
    }

    return this.isReady;
  }

  private _setupFormatter(): boolean {
    this.formatter.width = this._viewportWidth;
    const rootArtist = new Artist(0, 0, this._viewportWidth);
    const rootVextab = new VexTab(rootArtist);

    try {
      rootVextab.parse(this._vextab);
      this.formatter.format(rootVextab.elements);

      return true;
    } catch (error) {
      this.parseError = error.message;
      return false;
    }
  }

  private _setupLines(): boolean {
    const { measureChunks } = this.formatter;

    try {
      this.vextabs = measureChunks.map(measureChunk => {
        let vextabStr = '';
        vextabStr += ('\n' + measureChunk[0].head + '\n');
        vextabStr += measureChunk.map(measure => measure.body).join('\n');

        const artist = new Artist(10, 20, this._viewportWidth - 20);
        const vextab = new VexTab(artist);

        vextab.parse(vextabStr);
        return vextab;
      });

      return true;
    } catch (error) {
      this.parseError = error.message;
      return false;
    }
  }

  private _setupTickman(): boolean {
    try {
      this.player.deadTimeMs = this._deadTime * 1000;
      this.player.bpm = this._bpm;
      this.tickman.viewportWidth = this.viewportWidth;

      const artists = this.vextabs.map(vextab => vextab.artist);

      const voices = flatMap(artists, artist => artist.getPlayerData().voices);
      const tabVoices = flatMap(artists, artist => artist.staves.map(stave => stave.tab_voices));

      if (voices.length > 0) {
        this.tickman.update(voices, tabVoices);
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default VexProvider;
