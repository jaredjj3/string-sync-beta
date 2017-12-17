import React from 'react';
import { Row, Col, Collapse } from 'antd';
import Play from 'components/video/controls/play';
import Scrubber from 'components/video/controls/scrubber';
import Loop from 'components/video/controls/loop';
import FretboardToggle from 'components/fretboard/toggle';

const { Panel } = Collapse;

const ControlRow1 = () => (
  <Row
    className="NotationControls__row1"
    type="flex" align="middle" justify="center"
  >
    <Col span={22}>
      <Loop />
    </Col>
  </Row>
);

const ControlRow2 = () => (
  <Row
    className="NotationControls__row2"
    type="flex" align="middle" justify="center"
  >
    <Col span={22}>
      <Scrubber />
    </Col>
  </Row>
);

const NotationControlsContent = () => (
  <div className="NotationControls__content">
    <Row type="flex" align="middle" justify="center">
      <Col span={2}>
      <Row
        className="NotationControls__content--aside"
        type="flex" align="middle" justify="end"
      >
          <Play />
        </Row>
      </Col>
      <Col span={16}>
        <ControlRow1 />
        <ControlRow2 />
      </Col>
      <Col span={2}>
        <Row
          className="NotationControls__content--aside"
          type="flex" align="middle" justify="start"
          >
          <FretboardToggle />
        </Row>
      </Col>
    </Row>
  </div>
);

const NotationControls = () => (
  <div className="NotationControlsContainer">
    <Collapse
      className="NotationControls"
      defaultActiveKey={['1']}
    >
      <Panel header={null} key="1">
        <NotationControlsContent />
      </Panel>
    </Collapse>
  </div>
);

export default NotationControls;
