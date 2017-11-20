import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

import { withTab } from 'enhancers';
import { Flow, VexTab } from 'services/vexflow';

const { Renderer } = Flow;

interface ScoreLineProps {
  vextab: VexTab;
  provider: any;
}

class ScoreLine extends React.Component<ScoreLineProps, any> {
  canvas: HTMLCanvasElement = null;
  ctx: CanvasRenderingContext2D = null;
  renderer: any = null;

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c) {
      return;
    }

    this.canvas = c;
    this.renderer = new Renderer(c, Renderer.Backends.CANVAS);
    this.ctx = this.renderer.getContext();
    this.renderTab();
    this.maybeSetupTickman();
  }

  renderTab = (): void => {
    if (this.renderer !== null) {
      this.props.vextab.artist.render(this.renderer);
    }
  }

  maybeSetupTickman = (): void => {
    const { provider } = this.props;
    const shouldSetupTickman = provider.vextabs.every(vextab => vextab.artist.rendered);

    if (shouldSetupTickman) {
      provider._setupTickman();
    }
  }

  render(): JSX.Element {
    this.renderTab();

    return (
      <div className="ScoreLine">
        <canvas ref={this.setCanvas} />
      </div>
    );
  }
}

export default compose(
  withTab,
  onlyUpdateForKeys(['vextab'])
)(ScoreLine);
