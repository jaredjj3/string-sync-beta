import React from 'react';
import { compose, branch, onlyUpdateForKeys, renderComponent } from 'recompose';

import Icon from 'antd/lib/icon';
import { withVideo } from 'enhancers';

const playVideo = (videoPlayer) => () => videoPlayer.playVideo();
const pauseVideo = (videoPlayer) => () => videoPlayer.pauseVideo();

const Play = ({ videoPlayer }) => <Icon type="play-circle-o" onClick={playVideo(videoPlayer)} />;
const Pause = ({ videoPlayer }) => <Icon type="pause-circle-o" onClick={pauseVideo(videoPlayer)} />;

export default compose(
  withVideo,
  branch(
    ({ isVideoActive }) => isVideoActive,
    renderComponent(Pause),
    renderComponent(Play)
  ),
  onlyUpdateForKeys(['isVideoActive'])
)(() => null);
