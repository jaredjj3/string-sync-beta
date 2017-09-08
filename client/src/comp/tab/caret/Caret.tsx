import React from 'react';
import { connect } from 'react-redux';

import { isVideoActive } from 'util/videoStateCategory';

import { Point } from 'types/point';
import { Artist } from 'services/vexflow';

interface CaretProps {
  videoPlayer: any;
  videoState: string;
  artist: Artist;
}

interface CaretState {
  shouldRAF: boolean;
  currentTime: number;
  pos: Point;
}

const dupState = (state: CaretState): CaretState => {
  const pos = Object.assign(state.pos);
  return Object.assign({}, state, pos);
};

class Caret extends React.Component<CaretProps, CaretState> {
  static HEIGHT: number = 240;

  state: CaretState = {
    shouldRAF: false,
    currentTime: 0,
    pos: { x: 200, y: 20 }
  };

  RAFHandle: number = null;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  componentDidMount(): void {
    const { x, y } = this.state.pos;
    const { HEIGHT } = Caret;
    const h = HEIGHT / 4;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + Caret.HEIGHT);
    this.ctx.stroke();
  }

  componentWillReceiveProps(nextProps: CaretProps): void {
    const shouldRAF = nextProps.videoPlayer && isVideoActive(nextProps.videoState);
    const nextState = dupState(this.state);
    this.setState(Object.assign(nextState, { shouldRAF }));
  }

  componentDidUpdate(): void {
    if (this.state.shouldRAF) {
      this.RAFHandle = window.requestAnimationFrame(() => this.updateStateWithPlayer());
    } else {
      window.cancelAnimationFrame(this.RAFHandle);
      this.RAFHandle = null;
    }
  }

  shouldComponentUpdate(nextProps: CaretProps, nextState: CaretState): boolean {
    return (
      nextState.shouldRAF ||
      this.props.videoPlayer !== nextProps.videoPlayer ||
      this.props.videoState !== nextProps.videoState
    );
  }

  setCanvas = (c: HTMLCanvasElement): void => {
    if (!c || (this.canvas && this.ctx)) {
      return;
    }

    this.canvas = c;
    this.ctx = c.getContext('2d');
    this.ctx.strokeStyle = '#FC354C';
  }

  updateStateWithPlayer = (): void => {

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
  videoPlayer: state.video.player,
  videoState: state.video.state,
  artist: state.tab.artist
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caret);
