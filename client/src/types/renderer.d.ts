interface Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  render(): any;
  setup?(): any;
  teardown?(): any;
}
