import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Icon from 'antd/lib/icon';
import ToolTip from 'antd/lib/tooltip';

import { VideoPlayer } from 'types/videoPlayer';

interface PlaybackRateProps {
  isMobile: boolean;
  videoPlayer: VideoPlayer;
}

interface PlaybackRateState {
  playbackRateIndex: number;
}

class PlaybackRate extends React.Component<PlaybackRateProps, PlaybackRateState> {
  static PLAYBACK_RATES: ReadonlyArray<number> = Object.freeze([1, 0.5, 0.75]);

  state: PlaybackRateState = {
    playbackRateIndex: 0
  };

  handleClick = (e: React.SyntheticEvent<any>): void => {
    const playbackRateIndex = (this.state.playbackRateIndex + 1) % PlaybackRate.PLAYBACK_RATES.length;
    this.setState(Object.assign({}, this.state, { playbackRateIndex }));
    this.props.videoPlayer.setPlaybackRate(PlaybackRate.PLAYBACK_RATES[playbackRateIndex]);
  }

  render(): JSX.Element {
    const { isMobile } = this.props;
    const playbackRate = PlaybackRate.PLAYBACK_RATES[this.state.playbackRateIndex];

    if (isMobile) {
      return null;
    } else {
      return(
        <span>
          <ToolTip placement="top" title={`${playbackRate * 100}%`}>
            <Icon type="clock-circle" onClick={this.handleClick} />
          </ToolTip>
        </span>
      );
    }
  }
}

const mapStateToProps = state => ({
  isMobile: state.device.type === 'MOBILE' || state.device.isTouch,
  videoPlayer: state.video.player
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaybackRate);
