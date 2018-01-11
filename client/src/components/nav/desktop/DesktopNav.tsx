import * as React from 'react';
import { DesktopNavLeft, DesktopNavRight } from './';
import { Row, Col } from 'antd';

const DesktopNav = () => (
  <div className="Nav--desktop">
    <div className="Nav--desktop__inner">
      <Row type="flex" justify="space-between" align="middle">
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavLeft />
        </Col>
        <Col xs={0} sm={0} md={12} lg={12}>
          <DesktopNavRight />
        </Col>
      </Row>
    </div>
  </div>
);

export default DesktopNav;
