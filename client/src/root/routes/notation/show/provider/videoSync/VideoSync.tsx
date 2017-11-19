import React from 'react';
import { withVideo, withRAFLoop, withTab } from 'enhancers';
import {
  compose, withHandlers, createSink, lifecycle,
  onlyUpdateForKeys
} from 'recompose';

const RAF_LOOP_FUNC_NAME = 'VideoSync.updateTime';

class VideoSync extends React.Component<any, any> {
  componentWillReceiveProps(nextProps: any): void {
    nextProps.isVideoActive ? this.registerRAFLoop() : this.unregisterRAFLoop();
  }

  registerRAFLoop = (): void => {
    const { RAFLoop } = this.props;
    if (!RAFLoop.has(RAF_LOOP_FUNC_NAME)) {
      RAFLoop.register({
        name: RAF_LOOP_FUNC_NAME,
        precedence: 0,
        onAnimationLoop: this.updateTime
      });
    }
  }

  unregisterRAFLoop = (): void => {
    this.props.RAFLoop.unregister(RAF_LOOP_FUNC_NAME);
  }

  updateTime = (dt: number): void => {
    const { provider, videoPlayer } = this.props;
    if (provider && videoPlayer) {
      provider.currentTimeMs = videoPlayer.getCurrentTime() * 1000;
    }
  }

  render(): any {
    return null;
  }
}

const enhance = compose(
  withVideo,
  withRAFLoop,
  withTab,
  onlyUpdateForKeys(['isVideoActive']),
);

export default enhance(VideoSync);
