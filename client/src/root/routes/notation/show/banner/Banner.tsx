import React from 'react';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { Icon, Row, Col } from 'antd';
import { withNotation, withSession } from 'enhancers';
import { Notation, Session } from 'types';

interface BannerProps {
  session: Session;
  notation: Notation;
}

interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render(): JSX.Element {
    const { songName, artistName, transcriber, id } = this.props.notation;
    const { isLoggedIn } = this.props.session;

    const bannerText = id < 0 ? 'Loading...' : `${songName} by ${artistName} (${transcriber.username})`;

    return (
      <div className="NotationShowBanner" >
        <Row type="flex" align="middle" justify="center">
          <Col span={5}>
            <Row className="NotationShowBanner__icons" type="flex" justify="start">
              <span>
                <Link to="/library">
                  <div className="NotationsShowBanner__back">
                    <Icon type="close" style={{ fontSize: '24px' }} />
                    <span>back</span>
                  </div>
                </Link>
              </span>
            </Row>
          </Col>
          <Col className="NotationShowBanner__text" span={14}>
            {bannerText}
          </Col>
          <Col span={5}>
            <Row className="NotationShowBanner__icons" type="flex" justify="end">
              <span>
                <Link to={`/n/${id}/print`}>
                  <div className="NotationsShowBanner__print">
                    <Icon type="printer" style={{ fontSize: '24px' }} />
                  <span>print</span>
                  </div>
                </Link>
              </span>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const enhance = compose(
  withNotation,
  withSession
);

export default enhance(Banner);
