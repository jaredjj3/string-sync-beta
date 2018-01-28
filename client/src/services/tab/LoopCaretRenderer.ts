import { Tab, Line } from 'services';

class LoopCaretRenderer implements Renderer {
  static CARET_THICKNESS_PX: number = 2;
  static CARET_ALPHA: number = 0.25;

  line: Line = null;
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  width: number = 0;
  height: number = 0;
  posX: Array<number> = [0];
  strokeStyle: string = '';
  isRendered: boolean = false;
  loopLineNumber: Array<number> = [];

  constructor(line: Line, canvas: HTMLCanvasElement, width: number, height: number, strokeStyle: string) {
    this.line = line;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;

    this.ctx = canvas.getContext('2d');

    this.resize();
  }

  render(): LoopCaretRenderer {
    this.clear();
    this._renderCaret();
    this.isRendered = true;
    return this;
  }

  resize(): LoopCaretRenderer {
    const { canvas, width, height } = this;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.fillStyle = this.strokeStyle;
    this.ctx.lineWidth = LoopCaretRenderer.CARET_THICKNESS_PX;
    this.ctx.globalAlpha = LoopCaretRenderer.CARET_ALPHA;

    return this;
  }

  clear(): LoopCaretRenderer {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.isRendered = false;
    return this;
  }

  protected _renderCaret(): LoopCaretRenderer {
    const y = 0;
  
    if (this.posX.length > 0) {
      this.posX.forEach(x => {
        if (x > 0) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x, y + this.height);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      })
    }

    const x0 = this.posX[0] || 0;
    const x1 = this.posX[1] || this.canvas.width;
    this.ctx.rect(x0, 0, x1 - x0, this.canvas.height);
    this.ctx.fill();

    return this;
  }
}

export default LoopCaretRenderer;
