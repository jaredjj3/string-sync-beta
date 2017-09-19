import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import SeekSlider from './seekSlider';
import LoopSlider from './loopSlider';
import Play from './play';

interface TabVideoControlsProps {}

interface TabVideoControlsState {}

class TabVideoControls extends React.PureComponent<TabVideoControlsProps, TabVideoControlsState> {
  render(): JSX.Element {
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
                <Icon type="left-circle-o" />
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
                <Icon type="right-circle-o" />
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

export default TabVideoControls;
