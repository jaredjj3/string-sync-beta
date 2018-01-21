import * as React from 'react';
import { compose, withProps } from 'recompose';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { IconDescribe } from 'components';
import styled from 'styled-components';

const enhance = compose(
  withProps(props => ({
    bannerText: props.isFetching
      ? 'Loading...'
      : `${props.songName} by ${props.transcriber.username}`
  }))
);

const NotationShowBannerOuter = styled.div`
  padding: 20px;
  background: black;

  i {
    font-size: 20px;
  }
`;
const BannerTextOuter = styled.div`
  text-align: center;
  font-size: 16px;
`;

const NotationShowBanner = ({ bannerText }) => (
  <NotationShowBannerOuter>
    <Row type="flex" align="middle" justify="center">
      <Col span={5}>
        <Link to="/library">
          <IconDescribe type="close" description="close" />
        </Link>
      </Col>
      <Col span={14}>
        <BannerTextOuter>
          {bannerText}
        </BannerTextOuter>
      </Col>
      <Col span={5}>
      </Col>
    </Row>
  </NotationShowBannerOuter>
);

export default enhance(NotationShowBanner);
