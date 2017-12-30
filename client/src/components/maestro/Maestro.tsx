import * as React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withSync, withVideo } from 'enhancers';

// The purpose of this component is to wrap the Maestro service
// in a react wrapper, so that it can respond to changes in redux
// store props naturally.
const enhance = compose(
  withSync,
  withVideo,
  withProps(props => ({
    update: () => {
      const { sync, video } = props;
      const { maestro } = sync.state;
      const { player, isActive } = video.state;

      maestro.currentTimeMs = player.getCurrentTime() / 1000;
      maestro.isMediaActive = isActive;
    }
  })),
  withProps(props => {
    const { rafLoop, maestro } = props.sync.state;
    const name = 'Maestro.conduct';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 0,
          onAnimationLoop: props.update
        });
      },
      unregisterRaf: () => {
        rafLoop.unregister(name);
      },
      startRafLoop: () => {
        rafLoop.start();
      },
      stopRafLoop: () => {
        rafLoop.stop();
      },
    });
  }),
  lifecycle({
    componentDidMount(): void {
      this.props.registerRaf();
      this.props.startRafLoop();
    },
    componentWillUnmount(): void {
      this.props.stopRafLoop();
      this.props.unregisterRaf();
    }
  })
);

const Maestro = () => null;

export default enhance(Maestro);
