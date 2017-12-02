import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withVideo } from 'enhancers';
import Youtube from 'react-youtube';
import VideoControls from './controls';
import PLAYER_STATES from 'constants';

interface VideoProps {
  youtubeVideoId: string;
  showControls?: boolean;
  updateVideoPlayer(videoPlayer: any): void;
  updateVideoState(videoState: string): void;
  togglePanel(key: string): Function;
  resetVideo(): void;
}

interface VideoState {}

class Video extends React.Component<VideoProps, VideoState> {
  static defaultProps: any = {
    showControls: false
  };

  // for options https://github.com/troybetz/react-youtube
  static youtubeOptions: any = {
    playerVars: {
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      disablekb: 1,
      fs: 0,
      autoplay: 0,
      start: 0,
      loop: 1,
    }
  };

  componentWillUnmount(): void {
    this.props.resetVideo();
  }

  updateVideoPlayer = (e: React.SyntheticEvent<any>): void => {
    const videoPlayer = (e.target as any);
    this.props.updateVideoPlayer(videoPlayer);
  }

  updateVideoState = (e: any): void => {
    this.props.updateVideoState(PLAYER_STATES[e.data]);
  }

  render(): JSX.Element {
    const { youtubeVideoId, showControls } = this.props;

    return (
      <div className="Video">
        <Youtube
          className="Video__youtubePlayer"
          opts={Video.youtubeOptions}
          videoId={youtubeVideoId}
          onReady={this.updateVideoPlayer}
          onStateChange={this.updateVideoState}
        />
        {showControls ? <VideoControls /> : null}
      </div>
    );
  }
}

const enhance = compose(
  withVideo
);

export default enhance(Video);
