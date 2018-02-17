import * as React from 'react';
import { compose, withState, withProps, withHandlers, shouldUpdate, lifecycle } from 'recompose';
import { scroller } from 'react-scroll';
import { get, isEqual } from 'lodash';
import { withVideo } from 'enhancers';

const enhance = compose(
  withVideo,
  withState('focusedLineNumber', 'setFocusedLineNumber', 0),
  withState('scrollOffset', 'setScrollOffset', 0),
  withState('initialScroll', 'setInitialScroll', true),
  shouldUpdate((props, nextProps) => (
    !isEqual(props.video.state, nextProps.video.state) ||
    props.focusedLineNumber !== nextProps.focusedLineNumber ||
    props.scrollOffset !== nextProps.scrollOffset
  )),
  withHandlers({
    handleAnimationLoop: props => () => {
      const lineNumber = get(window.ss.maestro.snapshot.data, 'focused.line.number');

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
      const target = props.initialScroll
        ? `score-title`
        : `score-line-${props.focusedLineNumber}`

      scroller.scrollTo(target, {
        duration: 200,
        smooth: true,
        containerId: 'Score',
        offset: props.scrollOffset - 20,
        ignoreCancelEvents: true
      });
    }
  })),
  lifecycle({
    componentDidMount(): void {
      window.ss.maestro.scoreScrollerProps = this.props;
      this.props.registerRaf();
    },
    componentDidUpdate(): void {
      this.props.scrollToFocusedLine();

      // The initial scroll stops happening after the video is played.
      if (this.props.initialScroll && this.props.video.state.isActive) {
        this.props.setInitialScroll(false);
      }
    },
    componentWillUnmount(): void {
      this.props.unregisterRaf();
    }
  })
);

const ScoreScroller = () => null;

export default enhance(ScoreScroller);
