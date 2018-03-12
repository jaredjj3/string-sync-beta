import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Slider } from 'antd';
import { withVideo, withNotation, withRaf } from 'enhancers';
import { isBetween } from 'utilities';

const enhance = compose (
  withVideo,
  withNotation,
  withState('values', 'setValues', [0, 100]),
  withState('isScrubbing', 'setIsScrubbing', false),
  withProps(props => ({
    valuesMs: props.values.map(value => (value / 100) * props.notation.state.durationMs)
  })),
  withProps(({ valuesMs, notation }) => ({
    adjustedValuesMs: valuesMs.map(value => value - notation.state.deadTimeMs)
  })),
  withHandlers({
    handleAnimationLoop: props => dt => {
      const video = props.video.state;

      if (!video.player || props.isScrubbing) {
        return;
      }

      const { currentTimeMs, isActive } = window.ss.maestro;
      const shouldSeekToLoopStart = (
        isActive &&
        !isBetween(currentTimeMs, props.valuesMs[0] - 1000, props.valuesMs[1]) // add timeMs padding to first value
      );

      if (shouldSeekToLoopStart) {
        video.player.pauseVideo();
        video.player.seekTo(props.valuesMs[0] / 1000);
        window.setTimeout(() => video.player.playVideo(), 500);
      }
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'Loop.handleAnimationLoop',
      precedence: 6,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  withHandlers({
    handleChange: props => values => {
      const video = props.video.state;

      if (!props.isScrubbing) {
        props.setIsScrubbing(true);
      }

      if (video.playerState === 'PLAYING') {
        video.player.pauseVideo();
      }

      props.setValues(values);
    },
    handleAfterChange: props => values => {
      props.setIsScrubbing(false);
      props.setValues(values);
    }
  }),
  lifecycle({
    componentWillReceiveProps(nextProps: any): void {
      window.ss.maestro.enqueue(maestro => {
        maestro.loopMs = nextProps.adjustedValuesMs;
      });
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
      step={0.001}
      defaultValue={[0, 100]}
      value={values}
      tipFormatter={null}
      onChange={handleChange}
      onAfterChange={handleAfterChange}
    />
  </div>
);

export default enhance(Loop);
