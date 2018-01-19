import * as React from 'react';
import { DesktopNavLeft, DesktopNavRight } from './';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const DesktopNavWrapper = styled.div`
  font-weight: 200;
  border-bottom: 1px solid #fcfcfc;
  display: flex;
  justify-content: center;
  width: 100vw;
  background: white;

  .ant-menu-horizontal {
    border-bottom: none;
  }
`;
const DesktopNavInner = styled.div`
  width: 100%;
  max-width: 980px;
`;

const DesktopNav = () => (
  <DesktopNavWrapper className="Nav--desktop">
    <DesktopNavInner className="Nav--desktop__inner">
      <Row type="flex" justify="space-between" align="middle">
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavLeft />
        </Col>
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavRight />
        </Col>
      </Row>
    </DesktopNavInner>
  </DesktopNavWrapper>
);

export default DesktopNav;
