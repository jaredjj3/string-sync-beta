import * as React from 'react';
import { compose, withProps } from 'recompose';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { IconDescribe } from 'components';

const enhance = compose(
  withProps(props => ({
    bannerText: props.isFetching
      ? 'Loading...'
      : `${props.songName} by ${props.transcriber.username}`
  }))
);

const NotationShowBanner = ({ bannerText }) => (
  <div className="NotationShowBanner">
    <Row type="flex" align="middle" justify="center">
      <Col span={5}>
        <Link to="/library">
          <IconDescribe type="close" description="back" />
        </Link>
      </Col>
      <Col className="NotationShowBanner__text" span={14}>
        {bannerText}
      </Col>
      <Col span={5}>
      </Col>
    </Row>
  </div>
);

export default enhance(NotationShowBanner);
