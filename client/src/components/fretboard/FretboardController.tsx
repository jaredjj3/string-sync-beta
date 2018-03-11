import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Fretboard } from 'services';
import { isEmpty } from 'lodash';
import { withRaf } from 'enhancers';

const enhance = compose(
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot, fretboard } = window.ss.maestro;
      const { 
        lightGuitarPositions, pressGuitarPositions, justPressGuitarPositions, suggestGuitarPositions
      } = snapshot.data.fretboard;

      fretboard.update(
        lightGuitarPositions,
        pressGuitarPositions,
        justPressGuitarPositions,
        suggestGuitarPositions
      );
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'FretboardController.handleAnimationLoop',
      precedence: 1,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  lifecycle({
    componentDidMount(): void {
      window.ss.maestro.fretboard = new Fretboard();
    },
    componentWillUnmount(): void {
      window.ss.maestro.fretboard = new Fretboard();
    }
  })
);

const FretboardController = () => null;

export default enhance(FretboardController);
