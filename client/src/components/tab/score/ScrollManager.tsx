import * as React from 'react';
import { compose, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';

const enhance = compose(
  withSync,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { maestro } = props.sync.state;
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'ScrollManager.handleAnimationLoop';

    return({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 3,
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

const ScrollManager = () => null;

export default enhance(ScrollManager);
