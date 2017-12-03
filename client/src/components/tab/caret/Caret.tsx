import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withRaf, withTab, withVideo, withViewport } from 'enhancers';

class Caret extends React.Component<any, any> {
  static HEIGHT: number = 300; // px
  static LINE_WIDTH: number = 2; // px

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount(): void {
    this.registerRAFLoop();
  }

  componentWillReceiveProps(nextProps: any): void {
    if (nextProps.tab.provider.editMode && !nextProps.video.isActive) {
      this.unregisterRAFLoop();
      this.clearCaret();
    } else {
      this.registerRAFLoop();
    }
  }

  componentWillUnmount(): void {
    this.unregisterRAFLoop();
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
    this.resize();
  }

  resize (): void {
    const viewportWidth = this.props.viewport.width;
    const { canvas } = this;

    const ratio = window.devicePixelRatio || 1;
    const width = viewportWidth;
    const height = Caret.HEIGHT;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = '#FC354C';
    this.ctx.lineWidth = Caret.LINE_WIDTH;
    this.ctx.globalAlpha = 0.75;
  }

  registerRAFLoop = (): void => {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('Caret.renderCaret')) {
      RAFLoop.register({
        name: 'Caret.renderCaret',
        precedence: 5,
        onAnimationLoop: this.renderCaret
      });
    }
  }

  unregisterRAFLoop = (): void => {
    this.props.raf.loop.unregister('Caret.renderCaret');
  }

  clearCaret(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderCaret = (): void => {
    const { player } = this.props.tab.provider;
    this.clearCaret();

    if (player) {
      const x = player.caretPosX;
      const y = 0;

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + Caret.HEIGHT);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  render(): JSX.Element {
    return (
      <div className="Caret">
        <canvas className="Caret__canvas" ref={this.setCanvas} />
      </div>
    );
  }
}

const enhance = compose(
  withTab,
  withRaf,
  withVideo,
  withViewport,
);

export default enhance(Caret);
