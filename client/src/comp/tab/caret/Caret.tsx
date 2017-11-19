import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import { connect } from 'react-redux';

import { withRAFLoop, withTab, withVideo } from 'enhancers';

class Caret extends React.Component<any, any> {
  static HEIGHT: number = 300; // px
  static LINE_WIDTH: number = 2; // px

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentWillReceiveProps(nextProps: any): void {
    const { RAFLoop, isVideoActive } = nextProps;

    if (isVideoActive) {
      this.registerRAFLoop();
    } else {
      this.unregisterRAFLoop();
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
    const { viewportWidth } = this.props;
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
    if (!this.props.RAFLoop.has('Caret.renderCaret')) {
      this.props.RAFLoop.register({
        name: 'Caret.renderCaret',
        precedence: 5,
        onAnimationLoop: this.renderCaret
      });
    }
  }

  unregisterRAFLoop = (): void => {
    this.props.RAFLoop.unregister('Caret.renderCaret');
  }

  clearCaret(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  renderCaret = (): void => {
    const { player } = this.props.provider;
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

const mapStateToProps = state => ({
  viewportWidth: state.device.viewport.width
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withTab,
  withRAFLoop,
  withVideo,
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForKeys(['updatedAt', 'provider', 'RAFLoop', 'isVideoActive'])
)(Caret);
