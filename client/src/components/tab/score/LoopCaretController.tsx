import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo } from 'enhancers';
import { elvis, isBetween } from 'ssUtil';

const enhance = compose(
  withVideo,
  withHandlers({
    handleAnimationLoop: props => () => {
      // const { loopData, loopTick, line } = window.ss.maestro.snapshot.data;
      //
      // // Reset the renderers posX attribute
      // window.ss.maestro.tab.lines.forEach((line, ndx) => {
      //   if (line.loopCaretRenderer) {
      //     line.loopCaretRenderer.posX = [];
      //   }
      // });

      // // set the renderers posX attribute, then render each
      // loopData.forEach((data, ndx) => {
      //   const { line, interpolator } = data;
      //   if (!line || !interpolator) {
      //     return;
      //   }

      //   const renderer = line.loopCaretRenderer;
      //   const tick = loopTick[ndx];
      //   const range = line.getTickRange();
      //   if (isBetween(tick, range.start, range.stop)) {
      //     renderer.posX.push(interpolator(tick));
      //   }

      //   renderer.clear();
      // });

      // // only render the current line from the snapshot data
      // if (line && line.loopCaretRenderer) {
      //   line.loopCaretRenderer.render();
      // }
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'LoopCaretController.handleAnimationLoop';

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

const LoopCaretController = () => null;

export default enhance(LoopCaretController);
