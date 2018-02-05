import { Flow } from 'vexflow';
import { Artist, Vextab, Measure, Line } from 'services';
import { startsWith } from 'lodash';

const { Renderer } = Flow; // backend renderer

interface ScoreLineRendererSpec {
  line: Line;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

class ScoreLineRenderer implements Renderer  {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null;
  width: number = 0;
  height: number = 0;
  artist: any = null;
  vextab: any = null;
  vextabString: string = '';
  line: Line = null;

  constructor(line: Line, canvas: HTMLCanvasElement, width: number, height: number) {
    this.line = line;
    this.vextabString = line.vextabString;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  setup(): ScoreLineRenderer {
    this.renderer = new Renderer(this.canvas, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this._resize();

    this.artist = new Artist(10, 20, this.width - 10);
    this.vextab = new Vextab(this.artist);
    this.vextab.parse(this.vextabString);

    return this;
  }

  render(): ScoreLineRenderer {
    this._renderTab();
    this._renderMeasureNumbers();
    this._renderTabText();
    this._renderBranding();

    return this;
  }

  clear(): ScoreLineRenderer {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }

  private _resize(): ScoreLineRenderer {
    const { canvas, width, height } = this;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    return this;
  }

  private _renderTab(): ScoreLineRenderer {
    const stave = this.artist.staves[0];

    stave.tab_notes.forEach((tabNote, ndx) => {
      const staveNote = stave.note_notes[ndx];
      const jsonModifiers = [];
      const restModifiers = [];

      tabNote.modifiers.forEach(mod => {
        if (startsWith(mod.text, 'JSON=')) {
          // FIXME: Overly complicated logic to hack JSON into this scoreLineRenderer
          const json = mod.text.split('=')[1].replace(/\;/g, ',');
          jsonModifiers.push(JSON.parse(json));
        } else {
          restModifiers.push(mod);
        }
      });

      tabNote.modifiers = restModifiers;

      jsonModifiers.forEach(mod => {
        switch (mod.directive) {
          case 'GRACE_NOTE':
            // handle tabNote
            const graceTabNote = new Flow.GraceTabNote({
              positions: mod.positions || [],
              duration: mod.duration || '8'
            });
            const graceTabNoteGroup = new Flow.GraceNoteGroup([graceTabNote])

            tabNote.addModifier(graceTabNoteGroup);
            graceTabNote.context = tabNote.context;
            graceTabNote.tickContext = tabNote.getTickContext();

            // handle staveNote
            // TODO: Use the Tuning wrapper
            const tuning = new Flow.Tuning();
            const keys = graceTabNote.positions.map(({ str, fret }) => (
              tuning.getNoteForFret(fret, str)
            ));
            const graceNote = new Flow.GraceNote({ keys, duration: '8', slash: true });
            const slur = typeof mod.slur === 'undefined' ? false : mod.slur;
            const graceNoteGroup = new Flow.GraceNoteGroup([graceNote], slur);

            staveNote.addModifier(0, graceNoteGroup);
            graceNote.context = staveNote.context;
            graceNote.tickContext = staveNote.getTickContext();

            break;
          default:
            throw new Error(`'${mod.directive}' is not a handled directive`)
        }
      });
    });

    this.artist.render(this.renderer);

    this.line.linkVexInstances(stave);

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

  private _renderTabText(): ScoreLineRenderer {
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
