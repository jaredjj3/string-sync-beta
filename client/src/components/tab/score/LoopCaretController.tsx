import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo } from 'enhancers';
import { elvis, isBetween } from 'ssUtil';

const enhance = compose(
  withVideo,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { tab, snapshot } = window.ss.maestro;

      if (!tab || !snapshot) {
        return;
      }

      const loopLineNumbers = snapshot.data.loopData.map(data => elvis(data.line, 'number')).sort();

      // Clear all lines and set loopLineNumbers attributes
      tab.lines.forEach(line => {
        const renderer = line.loopCaretRenderer;
        if (renderer) {
          renderer.posX = [];
          renderer.loopLineNumbers = loopLineNumbers;

          if (renderer.isRendered) {
            renderer.clear();
          }
        }
      });

      // set the renderers posX attribute, then render each
      snapshot.data.loopData.forEach((data, ndx) => {
        const { line, interpolator } = data;
        if (!line || !interpolator) {
          return;
        }

        const renderer = line.loopCaretRenderer;
        const tick = snapshot.data.loopTick[ndx];
        const range = line.getTickRange();

        if (isBetween(tick, range.start, range.stop)) {
          renderer.posX.push(interpolator(tick))
        }
      });

      // render each of the line's loopRenderers if scrubbing
      if (snapshot.data.isLoopScrubbing) {
        tab.lines.forEach(({ loopCaretRenderer }) => {
          if (loopCaretRenderer) {
            loopCaretRenderer.render();
          }
        });
      }
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
