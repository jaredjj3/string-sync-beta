import React from 'react';
import Icon from 'antd/lib/icon';

import Row from 'antd/lib/row';

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
      <Row type="flex" align="middle" justify="start">
        {
          isActive ?
            <Icon type="pause-circle-o" onClick={this.pauseVideo} /> :
            <Icon type="play-circle-o" onClick={this.playVideo} />
        }
      </Row>
    );
  }
}

export default Play;
