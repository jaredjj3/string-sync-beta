import * as React from 'react';
import { compose, withHandlers, branch, renderComponent } from 'recompose';
import { Icon } from 'antd';
import { withVideo } from 'enhancers';

const Play = ({ handlePlayClick }) => (
  <span className="Play">
    <Icon
      type="play-circle-o"
      onClick={handlePlayClick}
    />
  </span>
);

const Pause = ({ handlePauseClick }) => (
  <span className="Pause">
    <Icon
      type="pause-circle-o"
      onClick={handlePauseClick}
    />
  </span>
);

const enhance = compose (
  withVideo,
  withHandlers({
    handlePlayClick: props => event => {
      props.video.state.player.playVideo();
    },
    handlePauseClick: props => event => {
      props.video.state.player.pauseVideo();
    }
  }),
  branch(
    ({ video }) => video.state.isActive,
    renderComponent(Pause),
    renderComponent(Play)
  )
);

const Dummy = () => null;

export default enhance(Dummy);
