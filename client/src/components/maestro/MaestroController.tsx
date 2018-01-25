import * as React from 'react';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo, withNotation } from 'enhancers';

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
  withProps(props => {
    const { rafLoop, maestro } = window.ss;
    const name = 'Maestro.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 0,
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
      this.props.unregisterRaf();
      rafLoop.stop();
      rafLoop.reset();
      maestro.reset();
    }
  })
);

const MaestroController = () => null;

export default enhance(MaestroController);