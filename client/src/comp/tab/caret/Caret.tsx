import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { isVideoActive } from 'util/videoStateCategory';
import { Point } from 'types/point';
import { VideoPlayer } from 'types';
import { VexPlayer } from 'services/vexflow';
import { withRAFLoop } from 'enhancers';

interface CaretProps {
  shouldRAF: boolean;
  tabPlayer: VexPlayer;
  viewport: any;
  videoPlayer: VideoPlayer;
  deadTime: number;
  tempo: number;
  focusedLine: number;
  focusedMeasure: number;
  RAFLoop: any;
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
    this.resize(viewport);
  }

  componentWillReceiveProps(nextProps: CaretProps): void {
    const { tabPlayer, viewport, focusedMeasure, focusedLine, videoPlayer, shouldRAF, RAFLoop } = nextProps;
    tabPlayer.viewport = viewport;

    if (nextProps.tempo) {
      tabPlayer.tempo = nextProps.tempo;
    }

    if (typeof nextProps.deadTime === 'number') {
      tabPlayer.deadTime = nextProps.deadTime;
    }

    if (!tabPlayer.isReady) {
      tabPlayer.prepare();
    }

    if (shouldRAF && tabPlayer.isReady) {
      this.resize(viewport);

      if (!RAFLoop.has('Caret.renderCaret')) {
        this.registerRAFLoop();
      }
    } else {
      this.unregisterRAFLoop();
    }
  }

  componentWillUnmount(): void {
    this.unregisterRAFLoop();
  }

  registerRAFLoop = (): void => {
    this.props.RAFLoop.register({
      name: 'Caret.renderCaret',
      precedence: 1,
      onAnimationLoop: this.renderCaret
    });
  }

  unregisterRAFLoop = (): void => {
    this.props.RAFLoop.unregister('Caret.renderCaret');
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
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.75;
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

  renderCaret = (): any => {
    const { tabPlayer, focusMeasure, videoPlayer } = this.props;
    const currentTime = videoPlayer.getCurrentTime();

    try {
      this.clearCanvas();
      this.drawCaret(tabPlayer.caretPosX(currentTime), Caret.START_POS_Y);
    } catch (e) {
      console.error(e);
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
  videoPlayer: state.video.player,
  viewport: state.device.viewport,
  deadTime: state.notation.deadTime,
  tempo: state.notation.tempo,
  focusedLine: state.tab.focusedLine,
  focusedMeasure: state.tab.focusedMeasure
});

const mapDispatchToProps = dispatch => ({
  focusMeasure: (measure: number) => dispatch(focusMeasure(measure))
});

export default compose(
  withRAFLoop,
  connect(mapStateToProps, mapDispatchToProps)
)(Caret);
