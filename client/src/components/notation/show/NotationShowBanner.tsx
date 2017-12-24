import * as React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { IconDescribe } from 'components';

const NotationShowBanner = ({ loading, songName, transcriber }) => {
  const bannerText = loading
    ? 'Loading...'
    : `${songName} by ${transcriber.username}`;

  return (
    <div className="NotationShowBanner">
      <Row type="flex" align="middle" justify="center">
        <Col span={5}>
          <IconDescribe type="close" description="back" />
        </Col>
        <Col className="NotationShowBanner__text" span={14}>
          {bannerText}
        </Col>
        <Col span={5}>
        </Col>
      </Row>
    </div>
  );
};

export default NotationShowBanner;
