import React from 'react';
import { compose, branch, onlyUpdateForKeys, renderComponent } from 'recompose';

import { Icon } from 'antd';
import { withVideo } from 'enhancers';

const playVideo = (videoPlayer) => () => videoPlayer.playVideo();
const pauseVideo = (videoPlayer) => () => videoPlayer.pauseVideo();

const Play = ({ videoPlayer }) => (
  <span>
    <Icon type="play-circle-o" onClick={playVideo(videoPlayer)} />
  </span>
);

const Pause = ({ videoPlayer }) => (
  <span>
    <Icon type="pause-circle-o" onClick={pauseVideo(videoPlayer)} />
  </span>
);

export default compose(
  withVideo,
  branch(
    ({ isVideoActive }) => isVideoActive,
    renderComponent(Pause),
    renderComponent(Play)
  ),
  onlyUpdateForKeys(['isVideoActive'])
)(() => null);
