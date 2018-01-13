import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Slider } from 'antd';
import { withVideo, withNotation } from 'enhancers';
import { isBetween } from 'ssUtil';

const enhance = compose (
  withVideo,
  withNotation,
  withState('values', 'setValues', [0, 100]),
  withState('isScrubbing', 'setIsScrubbing', false),
  withState('wasActive', 'setWasActive', false),
  withProps(props => ({
    getDurationMs: () => (
      props.notation.state.durationMs ||
      props.video.state.player.getDuration() * 1000
    )
  })),
  withProps(props => ({
    seekToLoopStart: () => {
      const videoPlayer = props.video.state.player;
      const durationMs = props.getDurationMs();

      if (durationMs > 0) {
        const timeSecs = ((props.values[0] + 1) / 100) * (durationMs / 1000);
        videoPlayer.pauseVideo();
        videoPlayer.seekTo(timeSecs, true);
        videoPlayer.playVideo();
      }
    }
  })),
  withHandlers({
    handleChange: props => values => {
      if (props.video.state.isActive && !props.isScrubbing) {
        props.setWasActive(true);
      }

      if (!props.isScrubbing) {
        props.setIsScrubbing(true);
      }

      if (props.video.state.playerState === 'PLAYING') {
        props.video.state.player.pauseVideo();
      }

      props.setValues(Object.assign([], values));
    },
    handleAfterChange: props => values => {
      props.setIsScrubbing(false);
      props.setValues(Object.assign([], values));

      const videoPlayer = props.video.state.player;
      const { currentTimeMs } = window.ss.maestro;
      const durationMs = props.getDurationMs();
      const nextFirstValueTimeMs = (values[0] / 100) * durationMs;

      const shouldPlayVideo = (
        props.wasActive &&
        (currentTimeMs >= nextFirstValueTimeMs)
      );

      if (shouldPlayVideo) {
        props.video.state.player.playVideo();
      }

      props.setWasActive(false);
    },
    handleAnimationLoop: props => dt => {
      const videoPlayer = props.video.state.player;

      if (!videoPlayer || props.isScrubbing) {
        return;
      }

      const { currentTimeMs } = window.ss.maestro;
      const durationMs = props.getDurationMs();

      if (durationMs > 0) {
        const currentValue = (currentTimeMs / durationMs) * 100;
        const shouldSeekToLoopStart = (
          currentValue === currentValue &&
          !isBetween(currentValue, props.values[0] - 1, props.values[1] - 1)
        );
        if (shouldSeekToLoopStart) {
          props.seekToLoopStart();
        }
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'Loop.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 6,
          onAnimationLoop: props.handleAnimationLoop
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      }
    });
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
    }
  })
);

const Loop = ({ video, values, handleChange, handleAfterChange }) => (
  <div className="Loop">
    <Slider
      range
      disabled={video.state.player === null}
      min={0}
      max={100}
      step={0.01}
      defaultValue={[0, 100]}
      value={values}
      tipFormatter={null}
      onChange={handleChange}
      onAfterChange={handleAfterChange}
    />
  </div>
);

export default enhance(Loop);
