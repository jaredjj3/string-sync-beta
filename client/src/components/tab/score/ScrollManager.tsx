import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { withSync } from 'enhancers';
import { ScrollPlan } from 'services';
import { currentId } from 'async_hooks';

const SCORE_HEIGHT_PX = 260;

const enhance = compose(
  withSync,
  withState('scoreEl', 'setScoreEl', null),
  withState('focusedLineNumber', 'setFocusedLineNumber', 0),
  withProps(props => ({
    scrollToLine: lineNumber => {
      const scoreLine = props.scoreLines[lineNumber];
    }
  })),
  withHandlers({
    handleAnimationLoop: props => () => {
      const { scrollPlan } = props.sync.state.maestro;

      if (scrollPlan) {
        const { currentLine } = scrollPlan.execution;
        if (currentLine && currentLine.number !== props.focusedLineNumber) {
          props.scoreEl.scrollTop(currentLine.number * SCORE_HEIGHT_PX);
          props.setFocusedLineNumber(currentLine.number);
        }
      }
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
      this.props.setScoreEl(window.$('#Score'));
      this.props.sync.state.maestro.scrollPlan = new ScrollPlan();
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
      this.props.sync.state.maestro.scrollPlan = null;
    }
  })
);

const ScrollManager = () => null;

export default enhance(ScrollManager);
