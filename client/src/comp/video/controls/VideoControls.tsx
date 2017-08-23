import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';

import formatTime from 'util/formatTime';
import videoStateCategory from 'util/videoStateCategory';
import { throttle, isEqual } from 'lodash';

import interpolator from 'util/interpolator';
import { Interpolator } from 'util/interpolator';

type SeekSliderValues = [number, number, number];

type UpdateSeekSliderFunc = (value: SeekSliderValues) => void;

interface VideoControlsProps {
  videoPlayer: any;
  videoState: string;
  togglePanel(key: string): any;
}

interface VideoControlsState {
  shouldRAF: boolean;
  currentTime: string;
  seekSliderValues: SeekSliderValues;
}

interface PlayerAttrs {
  currentTime: string;
  seekSliderValues: SeekSliderValues;
}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  static DEFAULT_SEEK_SLIDER_VALUES: SeekSliderValues = [-1, 0, 101];
  static MIN_HANDLE_DELTA: number = 5;

  state: VideoControlsState = {
    shouldRAF: false,
    currentTime: '0.0',
    seekSliderValues: VideoControls.DEFAULT_SEEK_SLIDER_VALUES
  };

  RAFHandle: number = null;
  toSeekSliderValue: Interpolator = null;
  toTime: Interpolator = null;
  updateSeekSlider: UpdateSeekSliderFunc;
  maybeSeekVideo: Function;
  isScrubbing: boolean = false;
  shouldPlayOnScrubEnd: boolean = false;

  constructor(props: VideoControlsProps) {
    super(props);

    this.updateSeekSlider = throttle(this._updateSeekSlider, 20);
    this.maybeSeekVideo = throttle(this._maybeSeekVideo, 250);
  }

  componentWillReceiveProps(nextProps: VideoControlsProps): void {
    this._maybeSetInterpolator(nextProps.videoPlayer);
    const shouldRAF = nextProps.videoPlayer && videoStateCategory(nextProps.videoState) === 'ACTIVE';
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
      !isEqual(this.state.seekSliderValues, nextState.seekSliderValues) ||
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

  pauseVideo = (): void => {
    this.props.videoPlayer.pauseVideo();
  }

  playVideo = (): void => {
    this.props.videoPlayer.playVideo();
  }

  render(): JSX.Element {
    const { videoPlayer, togglePanel, videoState } = this.props;
    const { currentTime, seekSliderValues } = this.state;
    const isVideoActive = videoStateCategory(videoState) === 'ACTIVE';

    return (
      <div className="VideoControls">
        <Row type="flex" align="middle" justify="center">
          <Col span={20}>
            <Slider
              range
              min={-1}
              max={101}
              step={0.01}
              onChange={this.updateSeekSlider}
              defaultValue={VideoControls.DEFAULT_SEEK_SLIDER_VALUES}
              value={seekSliderValues}
              tipFormatter={null}
              onAfterChange={this.restorePlayState}
            />
          </Col>
        </Row>
        <Row className="VideoControls__grannular" type="flex" align="middle" gutter={10}>
          <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
            {
              isVideoActive ?
                <Icon type="pause" onClick={this.pauseVideo} /> :
                <Icon type="caret-right" onClick={this.playVideo} />
            }
          </Col>
          <Col push={2} xs={3} sm={3} md={2} lg={2} xl={2}>
            <Row type="flex">
              <span style={{ fontSize: '12px' }}>
                {`${currentTime}s`}
              </span>
            </Row>
          </Col>
          <Col push={2} xs={4} sm={4} md={4} lg={2} xl={2}>
            <div>
              <Row type="flex" align="middle">
                <Icon type="clock-circle" style={{ marginRight: '4px' }}/>
                <span style={{ fontSize: '10px' }}>100%</span>
              </Row>
            </div>
          </Col>
          <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="sound" />
          </Col>
          <Col push={2} xs={5} sm={5} md={4} lg={3} xl={3}>
            <Slider defaultValue={100} />
          </Col>
          <Col push={3} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="retweet" />
          </Col>
          <Col push={3} xs={2} sm={2} md={1} lg={1} xl={1}>
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
  videoState: state.video.state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoControls);
