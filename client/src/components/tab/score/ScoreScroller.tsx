import * as React from 'react';
import { compose, withState, withProps, withHandlers, lifecycle } from 'recompose';
import { scroller } from 'react-scroll';
import { get } from 'lodash';

const enhance = compose(
  withState('auto', 'setAuto', true),
  withState('focusedLineNumber', 'setFocusedLineNumber', 0),
  withState('scrollOffset', 'setScrollOffset', 0),
  withHandlers({
    handleAnimationLoop: props => () => {
      const lineNumber = get(window.ss.maestro.snapshot.data, 'tab.line.number');

      if (typeof lineNumber === 'number' && lineNumber !== props.focusedLineNumber) {
        props.setFocusedLineNumber(lineNumber);
      }
    }
  }),
  withProps(props => {
    const { rafLoop } = window.ss;
    const name = 'ScoreScroller.handleAnimationLoop';

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
  withProps(props => ({
    scrollToFocusedLine: () => {
      if (typeof props.focusedLineNumber === 'number') {
        const target = `score-line-${props.focusedLineNumber}`;
        scroller.scrollTo(target, {
          activeClass: 'active',
          duration: 200,
          smooth: true,
          containerId: 'Score',
          offset: props.scrollOffset - 20
        });
      }
    }
  })),
  lifecycle({
    componentDidMount(): void {
      window.ss.maestro.scoreScrollerProps = this.props;
      this.props.registerRaf();
    },
    componentDidUpdate(): void {
      if (this.props.auto) {
        this.props.scrollToFocusedLine();
      }
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
    }
  })
);

const ScoreScroller = () => null;

export default enhance(ScoreScroller);
