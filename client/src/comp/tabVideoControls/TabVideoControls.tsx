import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import SeekSlider from './seekSlider';
import LoopSlider from './loopSlider';
import Play from './play';
import PlaybackRate from './playbackRate';

interface TabVideoControlsProps {
  isMobile: boolean;
}

interface TabVideoControlsState {}

class TabVideoControls extends React.Component<TabVideoControlsProps, TabVideoControlsState> {
  render(): JSX.Element {
    const { isMobile } = this.props;

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
                <Icon type="left-square-o" />
              </span>
              {
                isMobile ?
                  null :
                  <span>
                    <Icon type="left-circle-o" />
                  </span>
              }
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
              {
                isMobile ?
                null :
                <span>
                  <Icon type="right-circle-o" />
                </span>
              }
              <span>
                <Icon type="right-square-o" />
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

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabVideoControls);
