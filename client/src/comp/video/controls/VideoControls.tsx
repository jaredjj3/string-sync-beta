import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';

import formatTime from 'util/formatTime';
import videoStateCategory from 'util/videoStateCategory';

interface VideoControlsProps {
  videoPlayer: any;
  videoState: string;
  togglePanel(key: string): any;
}

interface VideoControlsState {
  shouldRAF: boolean;
  currentTime: string;
}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  state: VideoControlsState = {
    shouldRAF: false,
    currentTime: '0.0'
  };
  RAFHandle: number = null;

  componentWillReceiveProps(nextProps: VideoControlsProps): void {
    const shouldRAF = videoStateCategory(nextProps.videoState) === 'ACTIVE';
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

  updateStateWithPlayer = (videoPlayer: any): void => {
    if (!videoPlayer) {
      return;
    }

    const currentTime = formatTime(videoPlayer.getCurrentTime());
    const playerAttrs = { currentTime };

    this.setState(Object.assign({}, this.state, playerAttrs));
  }

  shouldComponentUpdate(nextProps: VideoControlsProps, nextState: VideoControlsState): boolean {
    return (
      nextState.shouldRAF ||
      this.props.videoPlayer !== nextProps.videoPlayer ||
      videoStateCategory(this.props.videoState) !== videoStateCategory(nextProps.videoState)
    );
  }

  render(): JSX.Element {
    const { videoPlayer, togglePanel } = this.props;
    const { currentTime } = this.state;

    return (
      <div className="VideoControls">
        <Row type="flex" align="middle" justify="center">
          <Col span={20}>
            <Slider range defaultValue={[0, 1, 100]} />
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
