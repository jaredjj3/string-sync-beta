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
        window.$('#Score').scrollTop(currentLineNumber * SCORE_HEIGHT_PX);
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
