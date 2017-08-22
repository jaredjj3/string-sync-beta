import React from 'react';
import { connect } from 'react-redux';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Slider from 'antd/lib/slider';

interface VideoControlsProps {
  videoPlayer: any;
  videoState: string;
  togglePanel(key: string): any;
}

interface VideoControlsState {}

class VideoControls extends React.Component<VideoControlsProps, VideoControlsState> {
  componentDidUpdate(): void {

  }

  shouldComponentUpdate(nextProps: VideoControlsProps): boolean {
    const category = (videoState: string) => (
      (videoState === 'PLAYING' || videoState === 'BUFFERING') ? 'ACTIVE' : 'PASSIVE'
    );

    return (
      this.props.videoPlayer !== nextProps.videoPlayer ||
      category(this.props.videoState) !== category(nextProps.videoState)
    );
  }

  render(): JSX.Element {
    const { videoPlayer, togglePanel } = this.props;

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
          <Col push={2} xs={2} sm={2} md={1} lg={1} xl={1}>
            0s
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
  videoPlayer: state.video.videoPlayer,
  videoState: state.video.state
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoControls);
