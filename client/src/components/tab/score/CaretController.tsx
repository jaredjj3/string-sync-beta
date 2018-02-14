import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { get } from 'lodash';

const enhance = compose(
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot } = window.ss.maestro;
      const caretRenderer = get(snapshot.data.line, 'caretRenderer', null);

      if (caretRenderer) {
        const { interpolator, tick } = snapshot.data;
        caretRenderer.posX[0] = interpolator(tick);
        caretRenderer.render();
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'CaretController.handleAnimationLoop';

    return ({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 2,
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

const CaretController = () => null;

export default enhance(CaretController);
