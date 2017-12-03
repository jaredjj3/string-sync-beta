import React from 'react';
import { Row, Col } from 'antd';
import Play from 'components/video/controls/play';
import Scrubber from 'components/video/controls/scrubber';
import Loop from 'components/video/controls/loop';
import FretboardToggle from 'components/fretboard/toggle';
import DesktopOnly from 'components/desktop/only';

const ControlRow1 = () => (
  <Row
    className="NotationControls__row1"
    type="flex" align="middle" justify="center"
  >
    <Col span={2}>
    </Col>
    <Col span={16}>
      <Loop />
    </Col>
    <Col span={2}>
    </Col>
  </Row>
);

const ControlRow2 = () => (
  <Row
    className="NotationControls__row2"
    type="flex" align="middle" justify="center"
  >
    <Col span={2}>
      <Row
        className="NotationControls--desktop__row2__controls"
        type="flex" align="middle" justify="end"
      >
        <Play />
      </Row>
    </Col>
    <Col span={16}>
      <Scrubber />
    </Col>
    <Col span={2}>
      <Row
        className="NotationControls--desktop__row2__controls"
        type="flex" align="middle" justify="start"
      >
        <FretboardToggle />
      </Row>
    </Col>
  </Row>
);

const NotationControls = () => (
  <div className="NotationControls">
    <ControlRow1 />
    <ControlRow2 />
  </div>
);

export default NotationControls;
