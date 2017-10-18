import React from 'react';
import { connect } from 'react-redux';

import Slider from 'antd/lib/slider';

import { throttle } from 'lodash';
import interpolator from 'util/interpolator';
import formatTime from 'util/formatTime';

import { Interpolator } from 'util/interpolator';
import { VideoPlayer } from 'types/videoPlayer';

interface SeekSliderProps {
  videoPlayer: VideoPlayer;
  isVideoActive: boolean;
  duration: number;
  loop: [number, number];
}

interface SeekSliderState {
  seekSliderValue: number;
}

class SeekSlider extends React.PureComponent<SeekSliderProps, SeekSliderState> {
  RAFHandle: number = null;
  isScrubbing: boolean = false;
  shouldPlayOnScrubEnd: boolean = false;
  maybeSeekVideo: any = null;
  handleChange: any = null;
  state: SeekSliderState = {
    seekSliderValue: 0
  };

  private _toTime: Interpolator = null;
  private _toSeekSliderValue: Interpolator = null;

  constructor(props: SeekSliderProps) {
    super(props);

    this.handleChange = throttle(this._handleChange, 10);
    this.maybeSeekVideo = throttle(this._maybeSeekVideo, 250);
  }

  componentWillReceiveProps(nextProps: SeekSliderProps): void {
    if (!this.areConvertorFuncsSet && nextProps.duration > 0) {
      this._toTime = interpolator({ x: 0, y: 0 }, { x: 100, y: nextProps.duration });
      this._toSeekSliderValue = interpolator({ x: 0, y: 0 }, { x: nextProps.duration, y: 100 });
    }

    this.updateSeekSliderValue();
  }

  shouldComponentUpdate(nextProps: SeekSliderProps, nextState: SeekSliderState): boolean {
    return (
      this.shouldRAF(nextProps) ||
      this.state.seekSliderValue !== nextState.seekSliderValue
    );
  }

  componentDidUpdate(): void {
    if (this.shouldRAF && !this.isScrubbing) {
      this.RAFHandle = window.requestAnimationFrame(this.updateSeekSliderValue);
    } else {
      window.cancelAnimationFrame(this.RAFHandle);
      this.RAFHandle = null;
    }
  }

  shouldRAF(props: SeekSliderProps = this.props): boolean {
    const { videoPlayer, isVideoActive } = props;
    return videoPlayer && isVideoActive && !this.isScrubbing;
  }

  get areConvertorFuncsSet(): boolean {
    return this._toSeekSliderValue !== null && this._toTime !== null;
  }

  updateSeekSliderValue = (): void => {
    const { videoPlayer, loop } = this.props;

    if (!videoPlayer || !this.areConvertorFuncsSet) {
      return;
    }

    const currentTime = videoPlayer.getCurrentTime();
    let seekSliderValue = 0;

    if (currentTime < loop[0] || currentTime > loop[1]) {
      seekSliderValue = this._toSeekSliderValue(loop[0]);
      videoPlayer.pauseVideo();
      videoPlayer.seekTo(loop[0]);
      videoPlayer.playVideo();
    } else {
      seekSliderValue = this._toSeekSliderValue(currentTime);
    }

    this.setState(Object.assign({}, this.state, { seekSliderValue }));
  }

  handleAfterChange = (): void => {
    const { videoPlayer } = this.props;

    if (this.shouldPlayOnScrubEnd) {
      videoPlayer.playVideo();
    } else {
      videoPlayer.pauseVideo();
    }

    this.shouldPlayOnScrubEnd = false;
    this.isScrubbing = false;

    this.updateSeekSliderValue();
  }

  tipFormatter = (value: number): string => {
    if (this._toTime === null) {
      return '0.0';
    }

    return formatTime(this._toTime(value));
  }

  render(): JSX.Element {
    const { seekSliderValue } = this.state;

    return (
      <div>
        <Slider
          step={0.01}
          value={seekSliderValue}
          defaultValue={0}
          onChange={this.handleChange}
          onAfterChange={this.handleAfterChange}
          tipFormatter={this.tipFormatter}
        />
      </div>
    );
  }

  private _handleChange = (seekSliderValue: number): void => {
    this._maybeStartScrubbing();
    this.maybeSeekVideo(this.state.seekSliderValue, seekSliderValue); // throttled
    this.setState(Object.assign({}, this.state, { seekSliderValue }));
  }

  private _maybeStartScrubbing = (): void => {
    const { videoPlayer, isVideoActive } = this.props;

    if (this.isScrubbing) {
      return;
    }

    this.shouldPlayOnScrubEnd = isVideoActive;
    this.isScrubbing = true;

    videoPlayer.pauseVideo();
  }

  private _maybeSeekVideo = (oldValue: number, newValue: number): void => {
    if (!this.isScrubbing) {
      return;
    }

    const { videoPlayer } = this.props;

    if (oldValue !== newValue) {
      videoPlayer.seekTo(this._toTime(newValue));
    }
  }
}

import { isVideoActive } from 'util/videoStateCategory';

const mapStateToProps = state => ({
  isVideoActive: isVideoActive(state.video.state),
  videoPlayer: state.video.player,
  duration: state.notation.duration / 1000,
  loop: state.video.loop
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeekSlider);
