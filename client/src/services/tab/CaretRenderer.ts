import { Tab, Line } from 'services';

class CaretRenderer implements Renderer {
  static CARET_THICKNESS_PX: number = 2;
  static CARET_ALPHA: number = 0.75;

  line: Line = null;
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  width: number = 0;
  height: number = 0;
  posX: Array<number> = [0];
  strokeStyle: string = '';
  isRendered: boolean = false;

  constructor(line: Line, canvas: HTMLCanvasElement, width: number, height: number, strokeStyle: string) {
    this.line = line;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;

    this.ctx = canvas.getContext('2d');

    this.resize();
  }

  render(): CaretRenderer {
    this.clear();
    this._renderCaret();
    this.isRendered = true;
    return this;
  }

  resize(): CaretRenderer {
    const { canvas, width, height } = this;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = CaretRenderer.CARET_THICKNESS_PX;
    this.ctx.globalAlpha = CaretRenderer.CARET_ALPHA;

    return this;
  }

  clear(): CaretRenderer {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.isRendered = false;
    return this;
  }

  protected _renderCaret(): CaretRenderer {
    const y = 0;
  
    this.posX.forEach(x => {
      if (x > 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + this.height);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    })

    return this;
  }
}

export default CaretRenderer;
