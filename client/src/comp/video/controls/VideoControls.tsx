import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';
import Scrubber from './scrubber';
import Play from './play';

import formatTime from 'util/formatTime';
import videoStateCategory from 'util/videoStateCategory';
import { isVideoActive } from 'util/videoStateCategory';
import { throttle, isEqual } from 'lodash';

import interpolator from 'util/interpolator';
import { Interpolator } from 'util/interpolator';
import { Device } from 'types/device';

export type SeekSliderValues = [number, number, number];

type UpdateSliderFunc = (value: number | SeekSliderValues) => void;

interface VideoControlsProps {
  videoPlayer: any;
  videoState: string;
  device: Device;
  togglePanel(key: string): any;
}

interface VideoControlsState {
  shouldRAF: boolean;
  currentTime: string;
  seekSliderValues: SeekSliderValues;
  volume: number;
  prevVolume: number;
  playbackRateIndex: number;
}

interface PlayerAttrs {
  currentTime: string;
  seekSliderValues: SeekSliderValues;
}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  static DEFAULT_SEEK_SLIDER_VALUES: SeekSliderValues = [-1, 0, 101];
  static MIN_HANDLE_DELTA: number = 3;
  static PLAYBACK_RATES: Array<number> = [1, 0.5, 0.75];

  state: VideoControlsState = {
    shouldRAF: false,
    currentTime: '0.0',
    seekSliderValues: VideoControls.DEFAULT_SEEK_SLIDER_VALUES,
    volume: 100,
    prevVolume: 100,
    playbackRateIndex: 0
  };

  RAFHandle: number = null;
  toSeekSliderValue: Interpolator = null;
  toTime: Interpolator = null;
  updateSeekSlider: UpdateSliderFunc;
  updateVolSlider: UpdateSliderFunc;
  maybeSeekVideo: Function;
  isScrubbing: boolean = false;
  shouldPlayOnScrubEnd: boolean = false;
  isVolumeInit: boolean = false;

  constructor(props: VideoControlsProps) {
    super(props);

    this.updateSeekSlider = throttle(this._updateSeekSlider, 10);
    this.updateVolSlider = throttle(this._updateVolSlider, 10);
    this.maybeSeekVideo = throttle(this._maybeSeekVideo, 250);
  }

  componentWillReceiveProps(nextProps: VideoControlsProps): void {
    this._maybeSetInterpolator(nextProps.videoPlayer);
    this._maybeInitVolume(nextProps.videoPlayer);
    const shouldRAF = nextProps.videoPlayer && isVideoActive(nextProps.videoState);
    this.setState(Object.assign({}, this.state, { shouldRAF }));
  }

  componentDidUpdate(): void {
    if (this.state.shouldRAF) {
      this.RAFHandle = window.requestAnimationFrame(() => this.updateStateWithPlayer(this.props.videoPlayer));
    } else {
      window.cancelAnimationFrame(this.RAFHandle);
      this.RAFHandle = null;
    }
  }

  shouldComponentUpdate(nextProps: VideoControlsProps, nextState: VideoControlsState): boolean {
    return (
      nextState.shouldRAF ||
      this.state.volume !== nextState.volume ||
      this.state.playbackRateIndex !== nextState.playbackRateIndex ||
      !isEqual(this.state.seekSliderValues, nextState.seekSliderValues) ||
      !isEqual(this.props.device, nextProps.device) ||
      this.props.videoPlayer !== nextProps.videoPlayer ||
      videoStateCategory(this.props.videoState) !== videoStateCategory(nextProps.videoState)
    );
  }

  get areConvertorFuncsSet(): boolean {
    return this.toSeekSliderValue !== null && this.toTime !== null;
  }

  updateStateWithPlayer = (videoPlayer: any): void => {
    if (!videoPlayer || !this.areConvertorFuncsSet) {
      return;
    }

    this.setState(Object.assign({}, this.state, this.playerAttributes(videoPlayer)));
  }

  playerAttributes(videoPlayer: any): any {
    const rawTime = videoPlayer.getCurrentTime();
    const currentTime = formatTime(rawTime);

    // sort numbers correctly
    // https://stackoverflow.com/questions/7000851/array-sort-doesnt-sort-numbers-correctly
    let seekSliderValues = Object.assign([], this.state.seekSliderValues).sort((a, b) => a - b);
    seekSliderValues[1] = this.toSeekSliderValue(rawTime);
    seekSliderValues = this._maybeLoop(seekSliderValues);

    return {
      currentTime,
      seekSliderValues
    };
  }

  restorePlayState = (): void => {
    const { videoPlayer } = this.props;
    if (this.shouldPlayOnScrubEnd) {
      videoPlayer.playVideo();
    } else {
      videoPlayer.pauseVideo();
    }

    this.shouldPlayOnScrubEnd = false;
    this.isScrubbing = false;
  }

  resetSliders = (e: React.SyntheticEvent<any>): void => {
    const seekSliderValues = Object.assign([], VideoControls.DEFAULT_SEEK_SLIDER_VALUES);
    seekSliderValues[1] = this.state.seekSliderValues[1];
    this.setState(Object.assign({}, this.state, { seekSliderValues }));
  }

  pauseVideo = (): void => {
    this.props.videoPlayer.pauseVideo();
  }

  playVideo = (): void => {
    this.props.videoPlayer.playVideo();
  }

  toggleMute = (e: React.SyntheticEvent<any>): void => {
    const { volume, prevVolume } = this.state;

    // non throttled versions of this._updateVolSlider
    if (volume === 0) {
      this._updateVolSlider(prevVolume);
    } else {
      this._updateVolSlider(0);
    }
  }

  updatePlaybackRate = (e: React.SyntheticEvent<any>): void => {
    const playbackRateIndex = (this.state.playbackRateIndex + 1) % VideoControls.PLAYBACK_RATES.length;

    const seekSliderValues = Object.assign([], this.state.seekSliderValues);
    this.setState(Object.assign({}, this.state, { seekSliderValues, playbackRateIndex }));
    this.props.videoPlayer.setPlaybackRate(VideoControls.PLAYBACK_RATES[playbackRateIndex]);
  }

  render(): JSX.Element {
    const { videoPlayer, togglePanel, videoState, device } = this.props;
    const { currentTime, seekSliderValues, volume, playbackRateIndex } = this.state;
    const { PLAYBACK_RATES } = VideoControls;

    const isActive = isVideoActive(videoState);
    const isMobile = device.type === 'MOBILE' || device.isTouch;

    return (
      <div className="VideoControls">
        <Row type="flex" align="middle" justify="center">
          <Scrubber
            values={seekSliderValues}
            onChange={this.updateSeekSlider}
            onAfterChange={this.restorePlayState}
          />
        </Row>
        <Row className="VideoControls__grannular" type="flex" align="middle" gutter={10}>
          <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Play isActive={isActive} videoPlayer={videoPlayer} />
          </Col>
          <Col push={2} xs={3} sm={3} md={2} lg={2} xl={2}>
            <Row type="flex" align="middle">
              <span style={{ fontSize: '12px' }}>
                {`${currentTime}s`}
              </span>
            </Row>
          </Col>
          {
            isMobile ? null :
              <Col push={2} xs={4} sm={4} md={4} lg={2} xl={2}>
                <div
                  className="VideoControls__playbackRate"
                  onClick={this.updatePlaybackRate}
                >
                  <Row type="flex" align="middle">
                    <Icon type="clock-circle" style={{ marginRight: '4px' }}/>
                    <span style={{ fontSize: '10px' }}>
                      {`${PLAYBACK_RATES[playbackRateIndex] * 100}%`}
                    </span>
                  </Row>
                </div>
              </Col>
          }
          {
            isMobile ? null :
              <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
                <Icon type="sound" onClick={this.toggleMute} />
              </Col>
          }
          {
            isMobile ? null :
              <Col push={2} xs={5} sm={5} md={4} lg={3} xl={3}>
                <Slider
                  value={volume}
                  defaultValue={100}
                  onChange={this.updateVolSlider}
                  onAfterChange={this.restorePlayState}
                />
              </Col>
          }
          <Col push={3} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="retweet" onClick={this.resetSliders} />
          </Col>
          <Col push={4} xs={2} sm={2} md={1} lg={1} xl={1}>
            <div onClick={togglePanel('fretboard')}>
              <Icon type="shrink" />
            </div>
          </Col>
        </Row>
      </div>
    );

  }

  private _updateSeekSlider = (nextValues: SeekSliderValues): void => {
    this._maybeStartScrubbing();
    let seekSliderValues = nextValues.sort((a, b) => a - b);
    seekSliderValues = this._adjustSliders(this.state.seekSliderValues, seekSliderValues);
    this.maybeSeekVideo(this.state.seekSliderValues, seekSliderValues); // throttled version
    this.setState(Object.assign({}, this.state, { seekSliderValues }));
  }

  private _updateVolSlider = (volume: number): void => {
    this._maybeStartScrubbing();
    const currVolume = this.state.volume;
    const prevVolume =  currVolume > 0 ? currVolume : this.state.prevVolume;
    const seekSliderValues = Object.assign([], this.state.seekSliderValues);
    this.setState(Object.assign({}, this.state, { seekSliderValues, prevVolume, volume }));
    this.props.videoPlayer.setVolume(volume);
  }

  private _maybeInitVolume = (videoPlayer: any): void => {
    if (this.isVolumeInit || !videoPlayer) {
      return;
    }

    const volume = videoPlayer.getVolume();
    const prevVolume = volume;
    const seekSliderValues = Object.assign([], this.state.seekSliderValues);
    this.setState(Object.assign({}, this.state, { seekSliderValues, volume, prevVolume }));

    this.isVolumeInit = true;
  }

  private _maybeStartScrubbing = (): void => {
    const { videoPlayer, videoState } = this.props;

    if (this.isScrubbing) {
      return;
    }

    this.shouldPlayOnScrubEnd = videoStateCategory(videoState) === 'ACTIVE';
    this.isScrubbing = true;

    videoPlayer.pauseVideo();
  }

  private _maybeSeekVideo = (oldValues: SeekSliderValues, newValues: SeekSliderValues): void => {
    if (!this.isScrubbing || !this.areConvertorFuncsSet) {
      return;
    }

    const { videoPlayer } = this.props;

    if (oldValues[1] !== newValues[1]) {
      videoPlayer.seekTo(this.toTime(newValues[1]));
    }
  }

  private _maybeSetInterpolator(videoPlayer: any): void {
    const duration = videoPlayer && videoPlayer.getDuration();
    const shouldSetInterpolators = !this.areConvertorFuncsSet && duration > 0;
    if (shouldSetInterpolators) {
      let point1, point2;

      point1 = { x: 0, y: 0 };
      point2 = { x: duration, y: 100 };
      this.toSeekSliderValue = interpolator(point1, point2);

      point1 = { x: 0, y: 0 };
      point2 = { x: 100, y: duration };
      this.toTime = interpolator(point1, point2);
    }
  }

  private _maybeLoop = (seekSliderValues: SeekSliderValues): SeekSliderValues => {
    const nextValues = Object.assign([], seekSliderValues);

    if (this.isScrubbing) {
      return nextValues;
    }

    const { videoPlayer } = this.props;

    const shouldLoop = nextValues[2] - nextValues[1] <= 1;
    if (shouldLoop) {
      nextValues[1] = nextValues[0] + 1;
      videoPlayer.seekTo(this.toTime(nextValues[1]));
    }

    return nextValues;
  }

  private _adjustSliders = (oldValues: SeekSliderValues, newValues: SeekSliderValues): SeekSliderValues => {
    const valuesDiff = newValues.map((newValue, i) => newValue - oldValues[i]);
    const isPushingRight = valuesDiff.some(value => value > 0);
    const isPullingLeft = valuesDiff.some(value => value < 0);

    if (isPushingRight) {
      return this._pushSlidersRight(newValues);
    } else if (isPullingLeft) {
      return this._pullSlidersLeft(newValues);
    } else {
      return Object.assign([], newValues);
    }
  }

  private _pushSlidersRight(seekSliderValues: SeekSliderValues): SeekSliderValues {
    const nextValues = Object.assign([], seekSliderValues);
    const [v0, v1, v2] = nextValues;
    const delta = VideoControls.MIN_HANDLE_DELTA;

    if (v1 - v0 <= delta) {
      nextValues[1] += delta;
    }

    if (v2 - v1 <= delta) {
      nextValues[2] += delta;
    }

    return nextValues;
  }

  private _pullSlidersLeft(seekSliderValues: SeekSliderValues): SeekSliderValues {
    const nextValues = Object.assign([], seekSliderValues);
    const [v0, v1, v2] = nextValues;
    const delta = VideoControls.MIN_HANDLE_DELTA;

    if (v2 - v1 <= delta) {
      nextValues[1] -= delta;
    }

    if (v1 - v0 <= delta) {
      nextValues[0] -= delta;
    }

    return nextValues;
  }
}

const mapStateToProps = state => ({
  videoPlayer: state.video.player,
  videoState: state.video.state,
  device: state.device
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoControls);
