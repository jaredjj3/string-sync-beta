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
    return (
      <div className="NotationShowBanner" >
        Banner
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
