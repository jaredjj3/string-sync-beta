import React from 'react';
import { connect } from 'react-redux';

import { isVideoActive } from 'util/videoStateCategory';

import { Point } from 'types/point';
import { Player } from 'services/vexflow';

interface CaretProps {
  shouldRAF: boolean;
  tabPlayer: Player;
  viewport: any;
}

interface CaretState {}

class Caret extends React.Component<CaretProps, CaretState> {
  static HEIGHT: number = 240;
  static START_POS_Y: number = 10;

  RAFHandle: number = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount(): void {
    this.resize(this.props.viewport);
  }

  componentWillReceiveProps(nextProps: CaretProps): void {
    if (nextProps.shouldRAF) {
      this.RAFHandle = window.requestAnimationFrame(this.renderCaret);
    }
  }

  resize (viewport: any): void {
    const { canvas } = this;

    const ratio = window.devicePixelRatio || 1;
    const { width } = viewport;
    const height = 277;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = '#FC354C';
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCaret = (): void => {
    const x = this.props.tabPlayer.caretPosX();
    const y = Caret.START_POS_Y;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + Caret.HEIGHT);
    this.ctx.stroke();
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
  }

  renderCaret = (): void => {
    try {
      this.clearCanvas();
      this.drawCaret();
    } catch (e) {
      // noop
    } finally {
      if (this.props.shouldRAF) {
        this.RAFHandle = window.requestAnimationFrame(this.renderCaret);
      } else {
        window.cancelAnimationFrame(this.RAFHandle);
        this.RAFHandle = null;
      }
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
  shouldRAF: state.video.player && isVideoActive(state.video.state),
  tabPlayer: state.tab.player,
  viewport: state.device.viewport
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caret);
