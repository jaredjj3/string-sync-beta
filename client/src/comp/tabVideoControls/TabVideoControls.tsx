import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Slider from 'antd/lib/slider';
import Play from 'comp/video/controls/play';

interface TabVideoControlsProps {
  isMobile: boolean;
  isVideoActive: boolean;
}

interface TabVideoControlsState {
  marks: any;
}

class TabVideoControls extends React.Component<TabVideoControlsProps, TabVideoControlsState> {
  state: TabVideoControlsState = {
    marks: { 0: '0', 100: '100' },
  };

  componentDidMount(): void {
    this.setMarks();
  }

  setMarks(): any {
    const marks = {
      0: '',
      20: '',
      40: '',
      60: '',
      80: '',
      100: ''
    };

    this.setState(Object.assign({}, this.state, { marks }));
  }

  measureTipFormatter = (value: number): string => {
    const { marks } = this.state;

    const marksKeys = Object.keys(marks);
    const currentMeasure = marksKeys.indexOf(value.toString()) + 1;
    return `${currentMeasure} / ${marksKeys.length}`;
  }

  render(): JSX.Element {
    const { isMobile } = this.props;
    const { marks } = this.state;

    return (
      <div className="TabVideoControls">
        <Row className="TabVideoControls__row" type="flex" align="middle" justify="center">
          <Col span={4}>
            <Row className="TabVideoControls__row__icons" type="flex" align="middle" justify="end">
              <span>
                <Icon type="left-circle-o" />
              </span>
            </Row>
          </Col>
          <Col span={16}>
            <Slider
              range
              step={null}
              marks={marks}
              tipFormatter={this.measureTipFormatter}
            />
          </Col>
          <Col span={4}>
            <Row className="TabVideoControls__row__icons" type="flex" align="middle" justify="start">
              <span>
                <Icon type="right-circle-o" />
              </span>
            </Row>
          </Col>
        </Row>
        <Row className="TabVideoControls__row" type="flex" align="middle" justify="center">
          <Col span={4}>
            <Row className="TabVideoControls__row__icons" type="flex" align="middle" justify="end">
              <span>
                <Row type="flex" align="middle" justify="center">
                  <Icon type="play-circle-o" />
                  {isMobile ? null : <span style={{ marginLeft: '5px' }}>{`${0.0}s`}</span>}
                </Row>
              </span>
              {
                isMobile ?
                null :
                <span style={{ marginLeft: '10px' }}>
                  <Row type="flex" align="middle" justify="center">
                    <Icon type="clock-circle" />
                    <span style={{ marginLeft: '5px' }}>{`${100}%`}</span>
                  </Row>
                </span>
              }
            </Row>
          </Col>
          <Col span={16}>
            <Slider />
          </Col>
          <Col span={4}>
            <Row className="TabVideoControls__row__icons" type="flex" align="middle" justify="start">
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

import { isVideoActive } from 'util/videoStateCategory';

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch,
  isVideoActive: isVideoActive(state.video.state),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabVideoControls);
