import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';

import formatTime from 'util/formatTime';
import videoStateCategory from 'util/videoStateCategory';

import interpolator from 'util/interpolator';
import { Interpolator } from 'util/interpolator';

interface VideoControlsProps {
  videoPlayer: any;
  videoState: string;
  togglePanel(key: string): any;
}

interface VideoControlsState {
  shouldRAF: boolean;
  currentTime: string;
  seekSliderValues: [number, number, number];
}

interface PlayerAttrs {
  currentTime: string;

}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  static DEFAULT_SEEK_SLIDER_VALUES: [number, number, number] = [-1, 0, 101];

  state: VideoControlsState = {
    shouldRAF: false,
    currentTime: '0.0',
    seekSliderValues: VideoControls.DEFAULT_SEEK_SLIDER_VALUES
  };
  RAFHandle: number = null;
  interpolator: Interpolator = null;

  componentWillReceiveProps(nextProps: VideoControlsProps): void {
    this.maybeSetInterpolator(nextProps.videoPlayer);
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
      this.props.videoPlayer !== nextProps.videoPlayer ||
      videoStateCategory(this.props.videoState) !== videoStateCategory(nextProps.videoState)
    );
  }

  maybeSetInterpolator(videoPlayer: any): void {
    const duration = videoPlayer && videoPlayer.getDuration();
    const shouldSetInterpolator = !this.interpolator && duration > 0;
    if (shouldSetInterpolator) {
      const point1 = { x: 0, y: 0 };
      const point2 = { x: duration, y: 100 };
      this.interpolator = interpolator(point1, point2);
    }
  }

  updateStateWithPlayer = (videoPlayer: any): void => {
    if (!videoPlayer || !this.interpolator) {
      return;
    }

    this.setState(Object.assign({}, this.state, this.playerAttributes(videoPlayer)));
  }

  playerAttributes(videoPlayer: any): any {
    const rawTime = videoPlayer.getCurrentTime();
    const currentTime = formatTime(rawTime);
    const seekSliderValues = Object.assign([], this.state.seekSliderValues).sort((a, b) => a - b);
    seekSliderValues[1] = this.interpolator(rawTime);

    return {
      currentTime,
      seekSliderValues
    };
  }

  render(): JSX.Element {
    const { videoPlayer, togglePanel } = this.props;
    const { currentTime, seekSliderValues } = this.state;

    return (
      <div className="VideoControls">
        <Row type="flex" align="middle" justify="center">
          <Col span={20}>
            <Slider
              range
              min={-1}
              max={101}
              step={0.01}
              defaultValue={VideoControls.DEFAULT_SEEK_SLIDER_VALUES}
              value={seekSliderValues}
            />
          </Col>
        </Row>
        <Row className="VideoControls__grannular" type="flex" align="middle" gutter={10}>
          <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
            <Icon type="caret-right" />
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
