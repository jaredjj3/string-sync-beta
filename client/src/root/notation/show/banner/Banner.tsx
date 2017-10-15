import React from 'react';
import { connect } from 'react-redux';

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
