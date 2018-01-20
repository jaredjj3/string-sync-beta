import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Fretboard } from 'services';
import { withFretboard } from 'enhancers';
import { isEmpty } from 'lodash';

const enhance = compose(
  withFretboard,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { data } = window.ss.maestro.snapshot;
      const light = isEmpty(data.light) ? [] : data.light;
      const press = isEmpty(data.press) ? [] : data.press;
      const justPress = isEmpty(data.justPress) ? [] : data.justPress;
      props.fretboard.state.instance.update(light, press, justPress);
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
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
      window.ss.maestro.fretboard = fretboard;
      this.props.registerRaf();
    },
    componentWillUnmount(): void {
      this.props.fretboard.dispatch.resetFretboard();
      window.ss.maestro.fretboard = null;
      this.props.unregisterRaf();
    }
  })
);

const FretboardAdapter = () => null;

export default enhance(FretboardAdapter);
