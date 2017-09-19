import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Icon from 'antd/lib/icon';

interface PlayProps {
  isMobile: boolean;
  isVideoActive: boolean;
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
    const { isMobile, isVideoActive } = this.props;

    return (
      <Row type="flex">
        <span>
          <Row type="flex" align="middle" justify="center">
            {
              isVideoActive ?
                <Icon type="pause-circle-o" onClick={this.pauseVideo} /> :
                <Icon type="play-circle-o" onClick={this.playVideo} />
            }
            {isMobile ? null : <span style={{ marginLeft: '5px' }}>{`${0.0}s`}</span>}
          </Row>
        </span>
        {
          isMobile ?
            null :
            <span style={{ marginLeft: '10px' }}>
              <Row type="flex" align="middle" justify="center">
                <Icon type="clock-circle" />
                <span style={{ marginLeft: '5px' }}>{`${100}%`}</span>
              </Row>
            </span>
        }
      </Row>
    );
  }
}

import { isVideoActive } from 'util/videoStateCategory';

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch,
  isVideoActive: isVideoActive(state.video.state),
  videoPlayer: state.video.player
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
