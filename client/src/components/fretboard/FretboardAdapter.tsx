import * as React from 'react';
import { compose, lifecycle, withProps, withHandlers } from 'recompose';
import { Fretboard } from 'services';
import { withFretboard, withSync } from 'enhancers';
import { isEmpty } from 'lodash';

const enhance = compose(
  withFretboard,
  withSync,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { data } = props.sync.state.maestro.snapshot;
      const light = isEmpty(data.light) ? [] : data.light;
      const press = isEmpty(data.press) ? [] : data.press;
      props.fretboard.state.instance.update(light, press);
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

const FretboardAdapter = () => null;

export default enhance(FretboardAdapter);
