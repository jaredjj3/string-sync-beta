import * as React from 'react';
import { Row, Col } from 'antd';
import { Loop, Scrubber, Play, ToggleControls } from './';
import styled from 'styled-components';

const NotationControlsOuter = styled.div`
  width: 100%;
  z-index: 22;
  background: #282828;
  color: lightgray;
  padding: 15px 0;

  .VideoScrubber, .Loop {
  .ant-slider-handle {
      border-color: #fc354c;
      margin-left: -18px;
      margin-top: -11px;
      width: 25px;
      height: 25px;
    }
  }
`;
const NotationControlsContentAsideRow = styled(Row)`
  .Play, .Pause,
  .ToggleControls__menuIcon {
    padding: 15px;
    font-size: 2.5em;
    font-weight: 100;
    cursor: pointer;
    z-index: 20;

    &:active {
      text-shadow: 0 0 30px white;
    }
  }

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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

const NotationControls = () => (
  <NotationControlsOuter className="NotationControls__content">
    <Row type="flex" align="middle" justify="center">
      <Col span={2}>
        <NotationControlsContentAsideRow type="flex" align="middle" justify="end">
          <Play />
        </NotationControlsContentAsideRow>
      </Col>
      <Col span={16}>
        <ControlRow1 />
        <ControlRow2 />
      </Col>
      <Col span={2}>
        <NotationControlsContentAsideRow type="flex" align="middle" justify="start">
          <ToggleControls />
        </NotationControlsContentAsideRow>
      </Col>
    </Row>
  </NotationControlsOuter>
);

export default NotationControls;
