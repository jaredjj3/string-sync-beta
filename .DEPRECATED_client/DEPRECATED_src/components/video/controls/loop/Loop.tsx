import React from 'react';
import { compose } from 'recompose';
import { Slider } from 'antd';
import { withVideo, withRaf, withTab, withNotation } from 'enhancers';
import { Video, RAF, Tab, Notation } from 'types';

interface LoopProps {
  video: Video;
  raf: RAF;
  tab: Tab;
  notation: Notation;
}
interface LoopState {
  values: [number, number];
}

class Loop extends React.Component<LoopProps, LoopState> {
  state: LoopState = { values: [0, 100] };
  isScrubbing: boolean = false;
  isAutoSeeking: boolean = false;

  componentWillReceiveProps(nextProps: LoopProps): void {
    if (nextProps.video.isActive) {
      this.registerUpdateLoop();
    } else {
      this.unregisterUpdateLoop();
    }
  }

  shouldComponentUpdate(nextProps: LoopProps, nextState: LoopState): boolean {
    return (
      this.props.video.isActive ||
      this.state.values[0] !== nextState.values[0] ||
      this.state.values[1] !== nextState.values[1] ||
      this.props.video.player !== nextProps.video.player
    );
  }

  registerUpdateLoop(): void {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('Loop.updateLoop')) {
      RAFLoop.register({
        name: 'Loop.updateLoop',
        precedence: 8,
        onAnimationLoop: this.updateLoop
      });
    }
  }

  unregisterUpdateLoop(): void {
    this.props.raf.loop.unregister('Loop.updateLoop');
  }

  updateLoop = (): void => {
    const value = this.valueFromVideoPlayer;

    if (value < this.state.values[0] || value >= this.state.values[1]) {
      this.goToLoopStart();
    }
  }

  goToLoopStart(): void {
    const videoPlayer = this.props.video.player;

    if (!videoPlayer) {
      return;
    }

    if (!this.isAutoSeeking) {
      this.isAutoSeeking = true;
      const timeS = this.toTimeMs(this.state.values[0]) / 1000;
      videoPlayer.pauseVideo();
      videoPlayer.seekTo(timeS, true);
      window.setTimeout(() => {
        videoPlayer.playVideo();
        this.isAutoSeeking = false;
      }, 500);
    }
  }

  get valueFromVideoPlayer (): number {
    const videoPlayer = this.props.video.player;

    if (!videoPlayer) {
      return 0;
    }

    const currentTime = videoPlayer.getCurrentTime();
    const duration = this.props.notation.durationMs / 1000;

    // avoid dividing by 0
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  toTimeMs(value: number): number {
    return (value / 100) * this.props.notation.durationMs;
  }

  handleChange = (values: [number, number]): void => {
    this.isScrubbing = true;

    if (this.props.video.playerState === 'PLAYING') {
      this.props.video.player.pauseVideo();
    }

    this.setState(Object.assign({}, this.state, { values }));
  }

  handleAfterChange = (values: [number, number]): void => {
    this.isScrubbing = false;
    this.setState(Object.assign({}, this.state, { values }));
  }

  render(): JSX.Element {
    return (
      <div className="VideoControlsLoop">
        <Slider
          range
          disabled={this.props.video.player === null}
          min={0}
          max={100}
          step={0.01}
          defaultValue={[0, 100]}
          value={this.state.values}
          tipFormatter={null}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
        />
      </div>
    );
  }
}

const enhance = compose(
  withVideo,
  withRaf,
  withTab,
  withNotation
);

export default enhance(Loop);
