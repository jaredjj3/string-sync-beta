import React from 'react';
import { withVideo, withRaf, withTab } from 'enhancers';
import { Video, RAF, Tab } from 'types';
import { compose, withHandlers, createSink, lifecycle } from 'recompose';

interface VideoSyncProps {
  video: Video;
  raf: RAF;
  tab: Tab;
}

interface VideoSyncState {

}

class VideoSync extends React.Component<VideoSyncProps, VideoSyncState> {
  componentWillReceiveProps(nextProps: any): void {
    nextProps.video.isActive ? this.registerRAFLoop() : this.unregisterRAFLoop();
  }

  shouldComponentUpdate(nextProps: any): boolean {
    return this.props.video.isActive !== nextProps.video.isActive;
  }

  registerRAFLoop = (): void => {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('VideoSync.updateTime')) {
      RAFLoop.register({
        name: 'VideoSync.updateTime',
        precedence: 0,
        onAnimationLoop: this.updateTime
      });
    }
  }

  unregisterRAFLoop = (): void => {
    this.props.raf.loop.unregister('VideoSync.updateTime');
  }

  updateTime = (dt: number): void => {
    const videoPlayer = this.props.video.player;
    const provider = this.props.tab.provider;

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
  withRaf,
  withTab
);

export default enhance(VideoSync);
