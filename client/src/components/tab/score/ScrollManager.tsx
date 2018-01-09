import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';
import { currentId } from 'async_hooks';

const SCORE_HEIGHT_PX = 260;

const enhance = compose(
  withSync,
  withState('focusedLineNumber', 'setFocusedLineNumber', 0),
  withProps(props => ({
    scrollToLine: lineNumber => {
      const scoreLine = props.scoreLines[lineNumber];
    }
  })),
  withHandlers({
    handleAnimationLoop: props => () => {
      // GO BACK
      // const { scrollPlan } = props.sync.state.maestro;

      // if (scrollPlan) {
      //   const { currentLine } = scrollPlan.execution;
      //   if (currentLine && currentLine.number !== props.focusedLineNumber) {
      //     window.$('#Score').scrollTop(currentLine.number * SCORE_HEIGHT_PX);
      //     props.setFocusedLineNumber(currentLine.number);
      //   }
      // }
    }
  }),
  withProps(props => {
    const { rafLoop } = props.sync.state;
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
