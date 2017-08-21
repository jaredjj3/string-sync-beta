import React from 'react';
import { connect } from 'react-redux';

import { Device } from 'types/device';

import Youtube from 'react-youtube';

interface VideoProps {
  youtubeVideoId: string;
  setVideoPlayer(videoPlayer: any): void;
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
      autoplay: 0,
      start: 0,
    }
  };

  setVideoPlayer = (e: React.SyntheticEvent<any>): void => {
    const videoPlayer = (e.target as any);
    this.props.setVideoPlayer(videoPlayer);
  }

  render(): JSX.Element {
    const { youtubeVideoId } = this.props;

    return (
      <div className="Video">
        <Youtube
          className="Video__youtubePlayer"
          opts={Video.youtubeOptions}
          videoId={youtubeVideoId}
          onReady={this.setVideoPlayer}
        />
      </div>
    );
  }
}

import { setVideoPlayer } from 'data/video/actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setVideoPlayer: videoPlayer => dispatch(setVideoPlayer(videoPlayer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
