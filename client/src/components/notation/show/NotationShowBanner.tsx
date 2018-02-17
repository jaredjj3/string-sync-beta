import * as React from 'react';
import { compose, withProps } from 'recompose';
import { Row, Col, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { IconDescribe } from 'components';
import styled from 'styled-components';

const enhance = compose(
  withProps(props => ({
    bannerText: props.isFetching
      ? 'Loading...'
      : `${props.songName} by ${props.artistName}`
  }))
);

const NotationShowBannerOuter = styled.div`
  padding: 5px 0;
  background: black;
  z-index: 11;
  color: white;
  text-align: center;
`;
const Lines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Line1 = styled.div`
  font-size: 14px;
`;
const Line2 = styled.div`
  font-size: 10px;
  color: #666;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  i {
    font-size: 16px;
  }
`;

const NotationShowBanner = ({ bannerText, createdAt }) => (
  <NotationShowBannerOuter>
    <Row type="flex" align="middle" justify="center">
      <Col span={4}>
        <Link to="/library">
          <IconContainer>
            <Icon type="arrow-left" />
          </IconContainer>
        </Link>
      </Col>
      <Col span={16}>
        <Lines>
          <Line1>
            {bannerText}
          </Line1>
          <Line2>
            {createdAt}
          </Line2>
        </Lines>
      </Col>
      <Col span={4}>
      </Col>
    </Row>
  </NotationShowBannerOuter>
);

export default enhance(NotationShowBanner);
