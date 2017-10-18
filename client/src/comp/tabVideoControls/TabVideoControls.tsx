import React from 'react';
import { connect } from 'react-redux';

import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import LoopSlider from './loopSlider';
import Play from './play';
import PlaybackRate from './playbackRate';
import Row from 'antd/lib/row';
import SeekSlider from './seekSlider';
import ToolTip from 'antd/lib/tooltip';

import { VideoPlayer } from 'types';

interface TabVideoControlsProps {
  isMobile: boolean;
  videoPlayer: VideoPlayer;
  focusPrevMeasure(): void;
  focusNextMeasure(): void;
  focusPrevLine(): void;
  focusNextLine(): void;
}

interface TabVideoControlsState {}

class TabVideoControls extends React.Component<TabVideoControlsProps, TabVideoControlsState> {
  pauseVideoThen = (callback: Function): any => {
    return (e: React.SyntheticEvent<any>) => {
      this.props.videoPlayer.pauseVideo();
      callback();
    };
  }

  render(): JSX.Element {
    const {
      isMobile,
      focusPrevMeasure,
      focusNextMeasure,
      focusPrevLine,
      focusNextLine
    } = this.props;

    return (
      <div className="TabVideoControls">
        <Row
          className="TabVideoControls__row"
          type="flex" align="middle" justify="center"
        >
          <Col span={4}>
            <Row
              className="TabVideoControls__row__icons"
              type="flex" align="middle" justify="end"
            >
              <span>
                {
                  isMobile ?
                  null :
                  <ToolTip placement="top" title="prev line">
                    <Icon type="left-square-o" onClick={this.pauseVideoThen(focusPrevLine)} />
                  </ToolTip>
                }
              </span>
              <span>
                <ToolTip placement="top" title="prev measure">
                  <Icon type="left-circle-o" onClick={this.pauseVideoThen(focusPrevMeasure)} />
                </ToolTip>
              </span>
            </Row>
          </Col>
          <Col span={16}>
            <LoopSlider />
          </Col>
          <Col span={4}>
            <Row
              className="TabVideoControls__row__icons"
              type="flex" align="middle" justify="start"
            >
              <span>
                <ToolTip placement="top" title="next measure">
                  <Icon type="right-circle-o" onClick={this.pauseVideoThen(focusNextMeasure)} />
                </ToolTip>
              </span>
              <span>
                {
                  isMobile ?
                    null :
                    <ToolTip placement="top" title="next line">
                      <Icon type="right-square-o" onClick={this.pauseVideoThen(focusNextLine)} />
                    </ToolTip>
                }
              </span>
            </Row>
          </Col>
        </Row>
        <Row
          className="TabVideoControls__row"
          type="flex" align="middle" justify="center"
        >
          <Col span={4}>
            <Row
              className="TabVideoControls__row__icons"
              type="flex" align="middle" justify="end"
            >
              <Play />
              <PlaybackRate />
            </Row>
          </Col>
          <Col span={16}>
            <SeekSlider />
          </Col>
          <Col span={4}>
            <Row
              className="TabVideoControls__row__icons"
              type="flex" align="middle" justify="start"
            >
              <span>
                <Icon type="database" />
              </span>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

import {
  focusPrevMeasure,
  focusNextMeasure,
  focusPrevLine,
  focusNextLine
} from 'data/tab/actions';

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch,
  videoPlayer: state.video.player
});

const mapDispatchToProps = dispatch => ({
  focusPrevMeasure: () => dispatch(focusPrevMeasure()),
  focusNextMeasure: () => dispatch(focusNextMeasure()),
  focusPrevLine: () => dispatch(focusPrevLine()),
  focusNextLine: () => dispatch(focusNextLine())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabVideoControls);
