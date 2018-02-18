import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Piano } from 'services';
import { isEmpty, compact } from 'lodash';
import { withRaf } from 'enhancers';

const enhance = compose(
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot, piano, tuning } = window.ss.maestro;
      const { lightGuitarPositions, pressGuitarPositions, justPressGuitarPositions } = snapshot.data.fretboard;

      const lightKeys = compact(lightGuitarPositions.map(pos => tuning.getNote(pos)));
      const pressKeys = compact(pressGuitarPositions.map(pos => tuning.getNote(pos)));
      const justPressKeys = compact(justPressGuitarPositions.map(pos => tuning.getNote(pos)));
      
      piano.update(lightKeys, pressKeys, justPressKeys);
    }
  }),
  withRaf(
    () => window.ss.rafLoop,
    props => ({
      name: 'PianoController.handleAnimationLoop',
      precedence: 1,
      onAnimationLoop: props.handleAnimationLoop
    })
  ),
  lifecycle({
    componentDidMount(): void {
      window.ss.maestro.piano = new Piano();
    },
    componentWillUnmount(): void {
      window.ss.maestro.piano = new Piano();
    }
  })
);

const PianoController = () => null;

export default enhance(PianoController);
