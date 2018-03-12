import { Flow } from 'vexflow';
import { Artist, Vextab, Measure, Line, Score, Fretboard, Maestro } from 'models';
import { startsWith } from 'lodash';
import { DirectiveExtractor } from 'models';

const { Renderer } = Flow;

interface ScoreLineRendererSpec {
  line: Line;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

class ScoreLineRenderer implements Renderer  {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null; // backend vextab renderer
  artist: any = null;
  vextab: any = null;
  vextabString: string = '';
  line: Line = null;
  maestro: Maestro = null;
  directiveExtractor: DirectiveExtractor = null;

  constructor(line: Line, canvas: HTMLCanvasElement, maestro: Maestro) {
    this.line = line;
    line.scoreLineRenderer = this;
    this.vextabString = line.vextabString;
    this.canvas = canvas;

    this._setup(maestro);
  }

  render(): ScoreLineRenderer {
    return this.
        _renderScore().
        _renderMeasureBarExtensions().
        _renderMeasureNumbers().
        _renderScoreText().
        _renderBranding();
  }

  clear(): ScoreLineRenderer {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }

  private _setup(maestro: Maestro): ScoreLineRenderer {
    // Create a renderer and resize it
    this.renderer = new Renderer(this.canvas, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this._resize();

    // Vextab parsing pattern
    this.artist = new Artist(10, 20, this.line.width);
    this.vextab = new Vextab(this.artist);
    this.vextab.parse(this.vextabString);

    // Execute directives, then link staveNotes and tabNotes to the Score service
    const stave = this.artist.staves[0];
    this.directiveExtractor = new DirectiveExtractor(stave, maestro);
    const directives = this.directiveExtractor.extract();

    directives.forEach(directive => directive.handler.execPre());
    this.line.linkVexInstances(stave);
    directives.forEach(directive => directive.handler.execPost());

    return this;
  }

  private _resize(): ScoreLineRenderer {
    const { canvas, line } = this;
    const { width, height } = line;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    return this;
  }

  private _renderMeasureBarExtensions(): ScoreLineRenderer {
    this.ctx.save();
    this.ctx.fillStyle = 'black';

    const barNoteXs = this.artist.staves[0].note_notes.
        filter(note => note.attrs.type === 'BarNote').
        map(barNote => barNote.getAbsoluteX());
    
    const staveX = this.artist.staves[0].note.end_x;

    [...barNoteXs, staveX].forEach(x => {
      const y0 = 100.5;
      const y1 = 161.5;
      this.ctx.fillRect(x, y0, 1, y1 - y0);
    });

    this.ctx.restore();

    return this;
  }

  private _renderScore(): ScoreLineRenderer {
    this.artist.render(this.renderer);
    return this;
  }

  private _renderMeasureNumbers(): ScoreLineRenderer {
    this.ctx.save();
    this.ctx.fillStyle = 'darkgray';
    this.ctx.font = 'italic 10px arial';

    this.artist.staves[0].note_notes.
        filter(note => note.attrs.type === 'BarNote').
        map(barNote => barNote.getAbsoluteX()).
        forEach((x, measureIndex) => {
          const measureNumber = this.line.select(measureIndex).number;
          this.ctx.fillText(measureNumber.toString(), x - 3, 50);
      });

    this.ctx.restore();

    return this;
  }

  private _renderScoreText(): ScoreLineRenderer {
    this.ctx.save();
    this.ctx.font = '24px sans-serif';

    this.artist.staves.map(stave => {
      let x = 20;
      let y = stave.tab.y + 73;
      this.ctx.fillText('T', x, y);
      this.ctx.fillText('A', x, y + 20);
      this.ctx.fillText('B', x, y + 40);
    });

    this.ctx.restore();

    return this;
  }

  private _renderBranding(): ScoreLineRenderer {
    this.ctx.save();
    this.ctx.fillStyle = 'darkgray';
    this.ctx.font = 'italic 12px arial';

    const websiteName = 'stringsync.com';
    const instagramName = '@stringsynced';

    this.ctx.fillText(websiteName, 10, 22);
    this.ctx.fillText(
      instagramName,
      parseInt(this.canvas.style.width, 10) - 85,
      22
    );

    this.ctx.restore();
    return this;
  }
}

export default ScoreLineRenderer;
