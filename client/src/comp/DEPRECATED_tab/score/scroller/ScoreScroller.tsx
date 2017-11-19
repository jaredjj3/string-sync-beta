import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRAFLoop } from 'enhancers';

import { isVideoActive } from 'util/videoStateCategory';

interface ScoreScrollerProps {
  RAFLoop: any;
  vexPlayer: any;
  shouldRAF: boolean;
  focusMeasure(measure: number): void;
}

interface ScoreScrollerState {}

class ScoreScroller extends React.Component<ScoreScrollerProps, ScoreScrollerState> {
  componentDidMount(): void {
    this.registerRAFLoop();
  }

  componentWillReceiveProps(nextProps: ScoreScrollerProps): void {
    const { shouldRAF, RAFLoop } = nextProps;

    if (shouldRAF) {
      if (!RAFLoop.has('TabServices.updateMeasure')) {
        this.registerRAFLoop();
      }
    } else {
      this.unregisterRAFLoop();
    }
  }

  updateMeasure = (): void => {
    try {
      const measure = this.props.vexPlayer.scrollSpec.lowTick.measureIndex;
      this.props.focusMeasure(measure);
    } catch (e) {
      // noop
    }
  }

  registerRAFLoop = (): void => {
    this.props.RAFLoop.register({
      name: 'TabServices.updateMeasure',
      precedence: 2,
      onAnimationLoop: this.updateMeasure
    });
  }

  unregisterRAFLoop = (): void => {
    this.props.RAFLoop.unregister('TabServices.updateMeasure');
  }

  render(): any {
    return null;
  }
}

import { focusMeasure } from 'data/tab/actions';

const mapStateToProps = state => ({
  shouldRAF: isVideoActive(state.video.state),
  vexPlayer: state.tab.vexPlayer
});

const mapDispatchToProps = dispatch => ({
  focusMeasure: measure => dispatch(focusMeasure(measure))
});

export default compose(
  withRAFLoop,
  connect(mapStateToProps, mapDispatchToProps)
)(ScoreScroller);
