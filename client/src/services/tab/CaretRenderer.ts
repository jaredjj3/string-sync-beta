import Tab from './Tab';
import Line from './Line';

class CaretRenderer implements Renderer {
  line: Line = null;
  canvas: HTMLCanvasElement = null;

  constructor(line: Line, canvas: HTMLCanvasElement) {
    this.line = line;
    this.canvas = canvas;
  }

  setup(): CaretRenderer {
    return this;
  }

  render(): CaretRenderer {
    return this;
  }
}

export default CaretRenderer;
