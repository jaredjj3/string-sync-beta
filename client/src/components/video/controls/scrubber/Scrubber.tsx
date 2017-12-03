import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';
import Slider from 'antd/lib/slider';
import { withVideo, withRaf, withTab } from 'enhancers';
import { VideoPlayer, Video, RAF, Tab } from 'types';

interface ScrubberProps {
  video: Video;
  raf: RAF;
  tab: Tab;
}

interface ScrubberState {
  value: number;
}

class Scrubber extends React.Component<ScrubberProps, ScrubberState> {
  state: ScrubberState = {
    value: 0
  };

  isScrubbing: boolean = false;

  componentWillReceiveProps(nextProps: ScrubberProps): void {
    if (nextProps.video.playerState === 'PLAYING') {
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
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('Scrubber.updateScrubber')) {
      RAFLoop.register({
        name: 'Scrubber.updateScrubber',
        precedence: 7,
        onAnimationLoop: this.updateScrubber
      });
    }
  }

  registerUpdateCurrentTime = (): void => {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('Scrubber.updateCurrentTime')) {
      RAFLoop.register({
        name: 'Scrubber.updateCurrentTime',
        precedence: 7,
        onAnimationLoop: this.updateCurrentTime
      });
    }
  }

  unregisterUpdateScrubber = (): void => {
    this.props.raf.loop.unregister('Scrubber.updateScrubber');
  }

  unregisterUpdateCurrentTime = (): void => {
    this.props.raf.loop.unregister('Scrubber.updateCurrentTime');
  }

  get valueFromVideoPlayer(): number {
    const currentTime = this.props.video.player.getCurrentTime();
    const duration = this.props.video.player.getDuration();

    // avoid dividing by 0
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }

  get currentTimeMsFromScrubber(): number {
    const { player } = this.props.video;
    return player ? (this.state.value * player.getDuration() / 100) * 1000 : 0;
  }

  updateCurrentTime = (): void => {
    this.props.tab.provider.currentTimeMs = this.currentTimeMsFromScrubber;
  }

  updateScrubber = (): void => {
    const value = this.valueFromVideoPlayer;
    this.setState(Object.assign({}, this.state, { value }));
  }

  handleChange = (value: number): void => {
    this.isScrubbing = true;

    if (this.props.video.playerState === 'PLAYING') {
      this.props.video.player.pauseVideo();
    }

    this.props.video.player.seekTo(this.currentTimeMsFromScrubber / 1000, true);
    this.setState(Object.assign({}, this.state, { value }));
  }

  handleAfterChange = (value: number): void => {
    this.isScrubbing = false;
    this.setState(Object.assign({}, this.state, { value }));
    this.props.video.player.seekTo(this.currentTimeMsFromScrubber / 1000, true);
  }

  render(): JSX.Element {
    return (
      <div className="VideoScrubber">
        <Slider
          disabled={this.props.video.player === null}
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

const enhance = compose(
  withVideo,
  withRaf,
  withTab
);

export default enhance(Scrubber);
