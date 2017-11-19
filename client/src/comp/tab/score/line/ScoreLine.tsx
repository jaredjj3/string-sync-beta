import React from 'react';

import { Flow, VexTab } from 'services/vexflow';

const { Renderer } = Flow;

interface ScoreLineProps {
  vextab: VexTab;
}

class ScoreLine extends React.Component<ScoreLineProps, any> {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null;

  setCanvas = (c: HTMLCanvasElement): void => {
    this.canvas = c;
    this.renderer = new Renderer(c, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this.renderTab();
  }

  renderTab = (): void => {
    if (this.renderer !== null) {
      this.props.vextab.artist.render(this.renderer);
    }
  }

  render(): JSX.Element {
    this.renderTab();

    return (
      <div>
        <canvas ref={this.setCanvas} />
      </div>
    );
  }
}

export default ScoreLine;
