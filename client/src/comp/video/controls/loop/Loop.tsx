import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

import { Slider } from 'antd';
import { withVideo, withRAFLoop, withTab } from 'enhancers';
import { VideoPlayer } from 'types';

interface LoopProps {
  videoPlayer: VideoPlayer;
  videoState: string;
  RAFLoop: any;
  provider: any;
  isVideoActive: boolean;
}
interface LoopState {
  values: [number, number];
}

class Loop extends React.Component<LoopProps, LoopState> {
  state: LoopState = { values: [0, 100] };
  isScrubbing: boolean = false;
  isAutoSeeking: boolean = false;

  componentWillReceiveProps(nextProps: LoopProps): void {
    if (nextProps.isVideoActive) {
      this.registerUpdateLoop();
    } else {
      this.unregisterUpdateLoop();
    }
  }

  registerUpdateLoop(): void {
    const { RAFLoop } = this.props;

    if (!RAFLoop.has('Loop.updateLoop')) {
      RAFLoop.register({
        name: 'Loop.updateLoop',
        precedence: 8,
        onAnimationLoop: this.updateLoop
      });
    }
  }

  unregisterUpdateLoop(): void {
    this.props.RAFLoop.unregister('Loop.updateLoop');
  }

  updateLoop = (): void => {
    const value = this.valueFromVideoPlayer;

    if (value < this.state.values[0] || value >= this.state.values[1]) {
      this.goToLoopStart();
    }
  }

  goToLoopStart(): void {
    const { videoPlayer } = this.props;

    if (!videoPlayer) {
      return;
    }

    if (!this.isAutoSeeking) {
      this.isAutoSeeking = true;
      const time = this.toTimeMs(this.state.values[0]) / 1000;
      videoPlayer.pauseVideo();
      videoPlayer.seekTo(time, true);
      window.setTimeout(() => {
        videoPlayer.playVideo();
        this.isAutoSeeking = false;
      }, 500);
    }
  }

  get valueFromVideoPlayer (): number {
    const { videoPlayer } = this.props;

    if (!videoPlayer) {
      return 0;
    }

    const currentTime = videoPlayer.getCurrentTime();
    const duration = videoPlayer.getDuration();

    // avoid dividing by 0
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  toTimeMs(value: number): number {
    return (value * this.props.videoPlayer.getDuration() / 100) * 1000;
  }

  handleChange = (values: [number, number]): void => {
    this.isScrubbing = true;

    if (this.props.videoState === 'PLAYING') {
      this.props.videoPlayer.pauseVideo();
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
          disabled={this.props.videoPlayer === null}
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

export default compose(
  withVideo,
  withRAFLoop,
  withTab,
  onlyUpdateForKeys(['videoState'])
)(Loop);
