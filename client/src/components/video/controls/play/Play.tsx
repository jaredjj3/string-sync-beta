import React from 'react';
import { compose, branch, onlyUpdateForKeys, renderComponent } from 'recompose';

import { Icon } from 'antd';
import { withVideo } from 'enhancers';

const playVideo = (videoPlayer) => () => videoPlayer.playVideo();
const pauseVideo = (videoPlayer) => () => videoPlayer.pauseVideo();

const Play = ({ video }) => (
  <span>
    <Icon type="play-circle-o" onClick={playVideo(video.player)} />
  </span>
);

const Pause = ({ video }) => (
  <span>
    <Icon type="pause-circle-o" onClick={pauseVideo(video.player)} />
  </span>
);

export default compose(
  withVideo,
  branch(
    ({ video }) => video.isVideoActive,
    renderComponent(Pause),
    renderComponent(Play)
  ),
  onlyUpdateForKeys(['isVideoActive'])
)(() => null);
