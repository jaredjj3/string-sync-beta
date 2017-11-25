import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

import Slider from 'antd/lib/slider';
import { withVideo, withRAFLoop, withTab } from 'enhancers';

import { VideoPlayer } from 'types';

interface ScrubberProps {
  videoPlayer: VideoPlayer;
  videoState: string;
  isVideoActive: boolean;
  RAFLoop: any;
  provider: any;
}

interface ScrubberState {
  value: number;
}

class Scrubber extends React.Component<ScrubberProps, ScrubberState> {
  state: ScrubberState = {
    value: 0
  };

  isScrubbing: boolean = false;
  shouldPlayAfterChange: boolean = false;

  componentWillReceiveProps(nextProps: ScrubberProps): void {
    if (nextProps.videoState === 'PLAYING') {
      this.registerUpdateScrubber();
      this.unregisterUpdateCurrentTime();
     } else {
       this.unregisterUpdateScrubber();
       this.registerUpdateCurrentTime();
     }
  }

  componentWillUnmount(): void {
    this.unregisterUpdateScrubber();
    this.unregisterUpdateCurrentTime();
  }

  registerUpdateScrubber = (): void => {
    const { RAFLoop } = this.props;

    if (!RAFLoop.has('Scrubber.updateScrubber')) {
      RAFLoop.register({
        name: 'Scrubber.updateScrubber',
        precedence: 7,
        onAnimationLoop: this.updateScrubber
      });
    }
  }

  registerUpdateCurrentTime = (): void => {
    const { RAFLoop } = this.props;

    if (!RAFLoop.has('Scrubber.updateCurrentTime')) {
      RAFLoop.register({
        name: 'Scrubber.updateCurrentTime',
        precedence: 7,
        onAnimationLoop: this.updateCurrentTime
      });
    }
  }

  unregisterUpdateScrubber = (): void => {
    this.props.RAFLoop.unregister('Scrubber.updateScrubber');
  }

  unregisterUpdateCurrentTime = (): void => {
    this.props.RAFLoop.unregister('Scrubber.updateCurrentTime');
  }

  get valueFromVideoPlayer(): number {
    const currentTime = this.props.videoPlayer.getCurrentTime();
    const duration = this.props.videoPlayer.getDuration();

    // avoid dividing by 0
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  get currentTimeMsFromScrubber(): number {
    return (this.state.value * this.props.videoPlayer.getDuration() / 100) * 1000;
  }

  updateCurrentTime = (): void => {
    this.props.provider.currentTimeMs = this.currentTimeMsFromScrubber;
  }

  updateScrubber = (): void => {
    const value = this.valueFromVideoPlayer;
    this.setState(Object.assign({}, this.state, { value }));
  }

  handleChange = (value: number): void => {
    if (!this.isScrubbing) {
      this.shouldPlayAfterChange = this.props.isVideoActive;
      this.props.videoPlayer.pauseVideo();
      this.isScrubbing = true;
    }

    this.props.videoPlayer.seekTo(this.currentTimeMsFromScrubber / 1000);
    this.setState(Object.assign({}, this.state, { value }));
  }

  handleAfterChange = (value: number): void => {
    if (this.shouldPlayAfterChange) {
      this.props.videoPlayer.playVideo();
    }

    this.shouldPlayAfterChange = false;
    this.isScrubbing = false;
  }

  render(): JSX.Element {
    return (
      <div className="VideoScrubber">
        <Slider
          disabled={this.props.videoPlayer === null}
          min={0}
          max={100}
          step={0.01}
          defaultValue={0}
          value={this.state.value}
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
  onlyUpdateForKeys(['isVideoActive'])
)(Scrubber);
