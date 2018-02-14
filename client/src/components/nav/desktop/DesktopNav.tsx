import * as React from 'react';
import { DesktopNavLeft, DesktopNavRight } from './';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const DesktopNavOuter = styled(Row)`
  font-weight: 200;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: center;
  width: 100%;
  background: white;

  .ant-menu-horizontal {
    border-bottom: none;
  }
`;
const DesktopNavInner = styled(Col)`
  width: 100%;
  max-width: 980px;
  margin: 5px 20px;
`;

const DesktopNav = () => (
  <DesktopNavOuter className="Nav--desktop">
    <DesktopNavInner
      className="Nav--desktop__inner"
      xs={0} sm={0} md={24} lg={24}
    >
      <Row type="flex" justify="space-between" align="middle">
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavLeft />
        </Col>
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavRight />
        </Col>
      </Row>
    </DesktopNavInner>
  </DesktopNavOuter>
);

export default DesktopNav;
