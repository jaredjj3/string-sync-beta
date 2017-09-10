import React from 'react';
import { connect } from 'react-redux';

import { isVideoActive } from 'util/videoStateCategory';

import { Point } from 'types/point';
import { Player } from 'services/vexflow';

interface CaretProps {
  shouldRAF: boolean;
  tabPlayer: Player;
  viewport: any;
  focusMeasure(measure: number): void;
}

interface CaretState {}

class Caret extends React.Component<CaretProps, CaretState> {
  static HEIGHT: number = 300;
  static START_POS_Y: number = 0;

  RAFHandle: number = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount(): void {
    const { tabPlayer, viewport } = this.props;
    tabPlayer.viewport = viewport;
  }

  componentWillReceiveProps(nextProps: CaretProps): void {
    const { tabPlayer, viewport } = nextProps;
    tabPlayer.viewport = viewport;

    if (nextProps.shouldRAF) {
      this.resize(viewport);
      this.RAFHandle = window.requestAnimationFrame(this.renderCaret);
    }
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
  }

  resize (viewport: any): void {
    const { canvas } = this;

    const ratio = window.devicePixelRatio || 1;
    const { width } = viewport;
    const height = 300;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    this.ctx.scale(ratio, ratio);
    this.ctx.strokeStyle = '#FC354C';
    this.ctx.lineWidth = 10;
    this.ctx.globalAlpha = 0.4;
  }

  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCaret = (x: number, y: number): void => {
    if (x === null || y === null) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + Caret.HEIGHT);
    this.ctx.stroke();
  }

  renderCaret = (): void => {
    const { tabPlayer, focusMeasure } = this.props;

    try {
      this.clearCanvas();
      this.drawCaret(this.props.tabPlayer.caretPosX(), Caret.START_POS_Y);
      focusMeasure(tabPlayer.currTick.measure);
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

import { focusMeasure } from 'data/tab/actions';

const mapStateToProps = state => ({
  shouldRAF: state.video.player && isVideoActive(state.video.state),
  tabPlayer: state.tab.player,
  viewport: state.device.viewport
});

const mapDispatchToProps = dispatch => ({
  focusMeasure: (measure: number) => dispatch(focusMeasure(measure))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caret);
