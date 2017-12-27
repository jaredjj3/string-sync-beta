import Tab from './Tab';
import Line from './Line';

class CaretRenderer implements Renderer {
  static CARET_THICKNESS_PX: number = 2;
  static CARET_ALPHA: number = 0.75;

  line: Line = null;
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  width: number = 0;
  height: number = 0;

  constructor(line: Line, canvas: HTMLCanvasElement, width: number, height: number) {

    this.line = line;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
  }

  setup(): CaretRenderer {
    return this;
  }

  render(): CaretRenderer {
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
    this.ctx.strokeStyle = '#FC354C';
    this.ctx.lineWidth = CaretRenderer.CARET_THICKNESS_PX;
    this.ctx.globalAlpha = CaretRenderer.CARET_ALPHA;

    return this;
  }

  clear(): CaretRenderer {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }
}

export default CaretRenderer;
