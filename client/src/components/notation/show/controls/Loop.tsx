import * as React from 'react';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Slider } from 'antd';
import { withVideo, withSync } from 'enhancers';

const enhance = compose (
  withVideo,
  withSync,
  withState('values', 'setValues', [0, 100]),
  withState('isScrubbing', 'setIsScrubbing', false),
  withHandlers({
    handleChange: props => values => {
      props.setIsScrubbing(true);

      if (props.video.state.playerState === 'PLAYING') {
        props.video.state.player.pauseVideo();
      }

      props.setValues(Object.assign([], values));
    },
    handleAfterChange: props => values => {
      props.setIsScrubbing(false);
      props.setValues(Object.assign([], values));
    },
    handleAnimationLoop: props => dt => {

    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
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
