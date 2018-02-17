import * as React from 'react';
import { Row, Col } from 'antd';
import { Loop, Scrubber, Play, ToggleControls } from './';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100%;
  z-index: 28;
  background: black;
  color: white;
  padding: 10px 0;
  height: 100px;

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
const Aside = styled(Row)`
  .Play, .Pause,
  .ToggleControls__menuIcon {
    padding: 15px;
    font-size: 2.5em;
    font-weight: 100;
    cursor: pointer;

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
const Inner = styled.div`

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
  <Outer className="NotationControls__content">
    <Inner>
      <Row type="flex" align="middle" justify="center">
        <Col span={2}>
          <Aside type="flex" align="middle" justify="end">
            <Play />
          </Aside>
        </Col>
        <Col span={16}>
          <ControlRow1 />
          <ControlRow2 />
        </Col>
        <Col span={2}>
          <Aside type="flex" align="middle" justify="start">
            <ToggleControls />
          </Aside>
        </Col>
      </Row>
    </Inner>
  </Outer>
);

export default NotationControls;
