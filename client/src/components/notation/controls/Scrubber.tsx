import * as React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { Slider } from 'antd';
import { withVideo, withNotation, withRaf } from 'enhancers';

const enhance = compose (
  withVideo,
  withNotation,
  withState('value', 'setValue', 0),
  withState('isScrubbing', 'setIsScrubbing', false),
  withState('wasActive', 'setWasActive', false),
  withHandlers({
    handleAnimationLoop: props => dt => {
      const videoPlayer = props.video.state.player;

      if (!videoPlayer || props.isScrubbing) {
        return;
      }

      const durationMs = props.notation.state.durationMs || videoPlayer.getDuration() * 1000;
      const { currentTimeMs } = window.ss.maestro;
      const nextValue = (currentTimeMs / durationMs) * 100;

      // Avoid NaN
      if (nextValue === nextValue) {
        props.setValue(nextValue);
        props.setIsScrubbing(false);
      }
    },
    handleChange: props => value => {
      if (props.video.state.isActive && !props.isScrubbing) {
        props.setWasActive(true);
      }

      if (!props.isScrubbing) {
        props.setIsScrubbing(true);

        if (props.video.state.playerState === 'PLAYING') {
          props.video.state.player.pauseVideo();
        }
      }

      const videoPlayer = props.video.state.player;
      const durationMs = props.notation.state.durationMs || videoPlayer.getDuration() * 1000;
      const nextTimeMs = (value / 100) * durationMs;

      window.ss.maestro.enqueue(maestro => maestro.currentTimeMs = nextTimeMs).update();

      videoPlayer.seekTo(nextTimeMs / 1000, true);
      props.setValue(value);
    },
    handleAfterChange: props => value => {
      const videoPlayer = props.video.state.player;
      const durationMs = props.notation.state.durationMs || videoPlayer.getDuration() * 1000;

      props.setIsScrubbing(false);
      props.setValue(value);

      const nextTimeSecs = ((value / 100) * durationMs) / 1000;

      window.ss.maestro.enqueue(maestro => maestro.currentTimeMs = nextTimeSecs * 1000).update();

      videoPlayer.seekTo(nextTimeSecs, true);

      if (props.wasActive) {
        videoPlayer.playVideo();
      }

      props.setWasActive(false);
    },
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'Scrubber.handleAnimationLoop',
      precedence: 7,
      onAnimationLoop: props.handleAnimationLoop      
    })
  )
);

const Scrubber = ({ video, value, handleChange, handleAfterChange }) => (
  <div className="VideoScrubber">
    <Slider
      disabled={video.state.player === null}
      min={0}
      max={100}
      step={0.01}
      defaultValue={0}
      value={value}
      tipFormatter={null}
      onChange={handleChange}
      onAfterChange={handleAfterChange}
    />
  </div>
);

export default enhance(Scrubber);
