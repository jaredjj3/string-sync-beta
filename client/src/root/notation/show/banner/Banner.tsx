import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Icon from 'antd/lib/icon';

interface BannerProps {
  name: string;
  artist: string;
  transcriber: string;
}

interface BannerState {}

class Banner extends React.Component<BannerProps, BannerState> {
  render(): JSX.Element {
    const { name, artist, transcriber } = this.props;

    return (
      <div className="NotationShowBanner" >
        <span className="NotationShowBanner__text">
          {`${name} by ${artist} (${transcriber})`}
        </span>
        <span>
          <Link to="/">
            <Icon type="home" />
          </Link>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
