import React from 'react';
import { compose } from 'recompose';
import { withVideo, withNotation } from 'enhancers';
import Youtube from 'react-youtube';
import VideoControls from './controls';
import PLAYER_STATES from 'constants/PLAYER_STATES';
import { VideoPlayer, Notation } from 'types';

interface VideoProps {
  youtubeVideoId: string;
  showControls?: boolean;
  video: Video;
  notation: Notation;
  setPlayer(videoPlayer: VideoPlayer): void;
  setPlayerState(playerState: string): void;
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

  shouldComponentUpdate(nextProps: VideoProps): boolean {
    return this.props.notation.youtubeVideoId !== nextProps.notation.youtubeVideoId;
  }

  componentWillUnmount(): void {
    this.props.resetVideo();
  }

  updateVideoPlayer = (e: React.SyntheticEvent<any>): void => {
    const videoPlayer = (e.target as any);
    this.props.setPlayer(videoPlayer);
  }

  updateVideoState = (e: any): void => {
    this.props.setPlayerState(PLAYER_STATES[e.data]);
  }

  render(): JSX.Element {
    const { youtubeVideoId } = this.props.notation;

    return (
      <div className="Video">
        <Youtube
          className="Video__youtubePlayer"
          opts={Video.youtubeOptions}
          videoId={youtubeVideoId}
          onReady={this.updateVideoPlayer}
          onStateChange={this.updateVideoState}
        />
      </div>
    );
  }
}

const enhance = compose(
  withVideo,
  withNotation
);

export default enhance(Video);
