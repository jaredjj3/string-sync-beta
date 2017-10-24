import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface BannerProps {
  isLoggedIn: boolean;
  name: string;
  artist: string;
  transcriber: string;
}

interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render(): JSX.Element {
    const { isLoggedIn, name, artist, transcriber } = this.props;

    return (
      <div className="NotationShowBanner" >
        <Row type="flex" align="middle" justify="center">
          <Col span={5} />
          <Col className="NotationShowBanner__text" span={14}>
            {`${name} by ${artist} (${transcriber})`}
          </Col>
          <Col span={5}>
            <Row className="NotationShowBanner__icons" type="flex" justify="end">
              {
                isLoggedIn ?
                null :
                <span>
                  <Link to="/login">
                    <Icon type="user" />
                  </Link>
                </span>
              }
              <span>
                <Link to="/library">
                  <Icon type="book" />
                </Link>
              </span>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id),
  name: state.notation.name,
  artist: state.notation.artist,
  transcriber: state.notation.transcriber
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Banner);
