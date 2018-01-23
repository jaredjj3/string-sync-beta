import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo } from 'enhancers';

const enhance = compose(
  withVideo,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { snapshot } = window.ss.maestro;
      const { loopTick } = snapshot.data;
      snapshot.data.loopData.forEach((loopDatum, ndx) => {
        if (!loopDatum) {
          return;
        }

        const { line, interpolator } = loopDatum;

        if (line && line.loopCaretRenderer) {
          line.loopCaretRenderer.posX[ndx] = interpolator(loopTick[ndx]);
          line.loopCaretRenderer.render();
        }
      });
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'LoopCaretAdapter.handleAnimationLoop';

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

const LoopCaretAdapter = () => null;

export default enhance(LoopCaretAdapter);
