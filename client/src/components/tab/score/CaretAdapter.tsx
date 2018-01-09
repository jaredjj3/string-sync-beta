import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';
import { elvis } from 'ssUtil';

const enhance = compose(
  withSync,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot } = props.sync.state.maestro;
      const caretRenderer = elvis(snapshot.data.line, 'caretRenderer');

      if (caretRenderer) {
        const { interpolator, tick } = snapshot.data;
        caretRenderer.posX = interpolator(tick);
        caretRenderer.render();
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
    const name = 'CaretManager.handleAnimationLoop';

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

const CaretAdapter = () => null;

export default enhance(CaretAdapter);
