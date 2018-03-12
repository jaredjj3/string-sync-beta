import * as React from 'react';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo, withNotation, withRaf } from 'enhancers';
import { Maestro } from 'models';

// The purpose of this component is to wrap the Maestro service
// in a react wrapper, so that it can respond to changes in redux
// store props naturally.
const enhance = compose(
  withVideo,
  withNotation,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { maestro } = window.ss;
      const { player, isActive } = props.video.state;

      if (player) {
        maestro.currentTimeMs = player.getCurrentTime() * 1000;
      }

      // update will not do anything if maestro.isActive === false
      // see Maestro._shouldUpdate()
      maestro.isActive = isActive;
      maestro.update();
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'Maestro.handleAnimationLoop',
      precedence: 0,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  lifecycle({
    componentDidMount(): void {
      window.ss.rafLoop.start();
    },
    componentWillReceiveProps(nextProps: any): void {
      const { maestro } = window.ss;
      const { bpm, deadTimeMs } = nextProps.notation.state;
      maestro.bpm = bpm;
      maestro.deadTimeMs = deadTimeMs;
    },
    componentWillUnmount(): void {
      const { rafLoop, maestro } = window.ss;
      rafLoop.stop();
      rafLoop.reset();
      window.ss.maestro = new Maestro();
    }
  })
);

const MaestroController = () => null;

export default enhance(MaestroController);
