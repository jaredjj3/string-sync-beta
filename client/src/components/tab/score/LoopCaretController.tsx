import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withVideo } from 'enhancers';
import { isBetween } from 'ssUtil';
import { get } from 'lodash';

const enhance = compose(
  withVideo,
  withHandlers({
    handleAnimationLoop: props => () => {
      const { tab, snapshot } = window.ss.maestro;

      if (!tab || !snapshot) {
        return;
      }

      const loopLineNumbers = snapshot.data.loop.notes.
        map(note => get(note, 'measure.line.number', null))

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
      snapshot.data.loop.notes.forEach((note, ndx) => {
        if (!note) {
          return;
        }

        const { interpolator } = note;
        const { line } = note.measure;
        const renderer = line.loopCaretRenderer;
        const tick = snapshot.data.loop.tickRange[ndx];
        const range = line.getTickRange();

        if (isBetween(tick, range.start, range.stop)) {
          renderer.posX.push(interpolator(tick))
        }
      });

      // render each of the line's loopRenderers if scrubbing and the maestro
      // does not require the loop to be force shown
      if (window.ss.maestro.options.showLoop || snapshot.data.loop.isScrubbing) {
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
