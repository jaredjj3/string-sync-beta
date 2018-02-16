import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Fretboard } from 'services';
import { isEmpty } from 'lodash';

const enhance = compose(
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot, fretboard } = window.ss.maestro;
      const { lightGuitarPositions, pressGuitarPositions, justPressGuitarPositions } = snapshot.data.fretboard;
      fretboard.update(lightGuitarPositions, pressGuitarPositions, justPressGuitarPositions);
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'FretboardController.handleAnimationLoop';

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
      window.ss.maestro.fretboard = new Fretboard();
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      window.ss.maestro.fretboard = new Fretboard();
      this.props.unregisterRaf();
    }
  })
);

const FretboardController = () => null;

export default enhance(FretboardController);
