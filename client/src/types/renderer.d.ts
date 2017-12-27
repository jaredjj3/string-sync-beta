interface Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  render(): any;
  clear(): any;
  setup?(): any;
  teardown?(): any;
}
