import React from 'react';
import { connect } from 'react-redux';

import { Device } from 'types/device';

import Youtube from 'react-youtube';

interface VideoProps {
  youtubeVideoId: string;
}

interface VideoState {}

class Video extends React.Component<VideoProps, VideoState> {
  // for options https://github.com/troybetz/react-youtube
  static youtubeOptions: any = {
    playerVars: {
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      controls: 1,
      showinfo: 0,
      disablekb: 1,
      fs: 0,
      autoplay: 1,
      start: 0,
    }
  };

  render(): JSX.Element {
    const { youtubeVideoId } = this.props;

    return (
      <div
        className="Video"
      >
        <Youtube
          className="Video__youtubePlayer"
          opts={Video.youtubeOptions}
          videoId={youtubeVideoId}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
