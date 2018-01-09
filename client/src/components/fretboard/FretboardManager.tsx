import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Fretboard } from 'services';
import { withFretboard, withSync } from 'enhancers';

const enhance = compose(
  withFretboard,
  withSync,
  withHandlers({
    handleAnimationLoop: props => () => {

    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'Fretboard.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 1,
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
      const fretboard = new Fretboard();
      this.props.fretboard.dispatch.setFretboard(fretboard);
      this.props.sync.state.maestro.fretboard = fretboard;
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      this.props.fretboard.dispatch.resetFretboard();
      this.props.sync.state.maestro.fretboard = null;
      this.props.unregisterRaf();
    }
  })
);

const FretboardManager = () => null;

export default enhance(FretboardManager);
