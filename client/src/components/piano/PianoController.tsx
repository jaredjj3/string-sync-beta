import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Piano } from 'services';
import { isEmpty, compact } from 'lodash';

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
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'PianoController.handleAnimationLoop';

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
      window.ss.maestro.piano = new Piano();
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      window.ss.maestro.piano = new Piano();
      this.props.unregisterRaf();
    }
  })
);

const PianoController = () => null;

export default enhance(PianoController);
