import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { currentId } from 'async_hooks';
import { elvis } from 'ssUtil';

const SCORE_HEIGHT_PX = 260;

const enhance = compose(
  withState('focusedLineNumber', 'setFocusedLineNumber', 0),
  withProps(props => ({
    scrollToLine: lineNumber => {
      const scoreLine = props.scoreLines[lineNumber];
    }
  })),
  withHandlers({
    handleAnimationLoop: props => () => {
      const currentLineNumber = elvis(window.ss.maestro.snapshot.data.line, 'number');

      if (typeof currentLineNumber === 'number' && (currentLineNumber !== props.focusedLineNumber)) {
        // FIXME: Go ahead, remove: window.$('#Score').scrollTop(scrollTo + 1);
        // Test it on mobile. Explain it. I dare you.
        //
        // For some reason, when scrolling more than 200 - 300px on mobile, the canvas
        // disappears until the first note is selected. It is suspected that this is an
        // optimization implemented by the browser.
        //
        // I couldn't find out why this happens, but this is a hack around it.
        //
        // I am not proud of it. :(
        const scrollTop = currentLineNumber * SCORE_HEIGHT_PX;
        const scoreElement = window.$('#Score');
        scoreElement.scrollTop(scrollTop + 1);
        scoreElement.scrollTop(scrollTop);

        props.setFocusedLineNumber(currentLineNumber);
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'ScrollManager.handleAnimationLoop';

    return({
      registerRaf: () => {
        rafLoop.register({
          name,
          precedence: 5,
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

const ScrollManager = () => null;

export default enhance(ScrollManager);
