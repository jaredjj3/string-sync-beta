import { Flow } from 'vexflow';
import { Artist, Tab } from 'services';
import { VexTab } from 'vextab/releases/vextab-div.js';

const { Renderer } = Flow;

interface TabRendererSpec {
  tab: Tab;
  lineIndex: number;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

class TabRenderer {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null;
  width: number = 0;
  height: number = 0;
  artist: any = null;
  vextab: any = null;
  vextabString: string = '';
  lineIndex: number = 0;
  tab: Tab;

  constructor(spec: TabRendererSpec) {
    this.lineIndex = spec.lineIndex;
    this.tab = spec.tab;
    this.canvas = spec.canvas;
    this.width = spec.width;
    this.height = spec.height;

    this.vextabString = this.tab.lines[this.lineIndex].vextabString;
  }

  setup(): TabRenderer {
    this.renderer = new Renderer(this.canvas, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this._resize();

    this.artist = new Artist(10, 20, this.width - 20);
    this.vextab = new VexTab(this.artist);
    this.vextab.parse(this.vextabString);

    return this;
  }

  render(): TabRenderer {
    this._renderTab();
    this._renderMeasureNumbers();
    this._renderTabText();
    this._renderBranding();

    return this;
  }

  private _resize(): TabRenderer {
    const { canvas, width, height } = this;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    return this;
  }

  private _renderTab(): TabRenderer {
    this.artist.render(this.renderer);
    return this;
  }

  private _renderMeasureNumbers(): TabRenderer {
    this.ctx.save();
    this.ctx.fillStyle = 'darkgray';
    this.ctx.font = 'italic 10px arial';

    this.artist.staves[0].note_notes.
        filter(note => note.attrs.type === 'BarNote').
        map(barNote => barNote.getAbsoluteX()).
        forEach((x, ndx) => {
          const { measuresPerLine } = this.tab;
          const measureNum = (measuresPerLine * this.lineIndex) + ndx + 1;
          this.ctx.fillText(measureNum, x - 3, 50);
      });

    this.ctx.restore();

    return this;
  }

  private _renderTabText(): TabRenderer {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    this.artist.staves.map(stave => {
      let x = 25;
      let y = stave.tab.y + 73;
      this.ctx.fillText('T', x, y);
      this.ctx.fillText('A', x, y + 20);
      this.ctx.fillText('B', x, y + 40);
    });

    this.ctx.restore();

    return this;
  }

  private _renderBranding(): TabRenderer {
    this.ctx.save();
    this.ctx.fillStyle = 'darkgray';
    this.ctx.font = 'italic 12px arial';

    const websiteName = 'stringsync.com';
    const instagramName = '@stringsynced';

    this.ctx.fillText(websiteName, 10, 17);
    this.ctx.fillText(
      instagramName,
      parseInt(this.canvas.style.width, 10) - 83,
      17
    );

    this.ctx.restore();
    return this;
  }
}

export default TabRenderer;
