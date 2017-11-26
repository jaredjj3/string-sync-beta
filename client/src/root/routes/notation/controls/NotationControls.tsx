import React from 'react';
import { compose, renderComponent, branch } from 'recompose';

import { Row, Col } from 'antd';
import Play from 'comp/video/controls/play';
import Scrubber from 'comp/video/controls/scrubber';
import Loop from 'comp/video/controls/loop';
import FretboardToggle from 'comp/fretboard/toggle';
import DesktopOnly from 'comp/desktop/only';
import { withDeviceType } from 'enhancers';

const enhance = compose(

);

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

const NotationControls = enhance(() => (
  <div className="NotationControls">
    <ControlRow1 />
    <ControlRow2 />
  </div>
));

export default NotationControls;
