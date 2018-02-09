interface Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  render(): any;
  clear(): any;
  teardown?(): any;
}
