import React from 'react';
import Icon from 'antd/lib/icon';

interface PlayProps {
  isActive: boolean;
  videoPlayer: any;
}

interface PlayState {}

class Play extends React.Component<PlayProps, PlayState> {
  pauseVideo = (): void => {
    this.props.videoPlayer.pauseVideo();
  }

  playVideo = (): void => {
    this.props.videoPlayer.playVideo();
  }

  render(): JSX.Element {
    const { isActive } = this.props;

    return (
      isActive ?
        <Icon type="pause" onClick={this.pauseVideo} /> :
        <Icon type="caret-right" onClick={this.playVideo} />
    );
  }
}

export default Play;
