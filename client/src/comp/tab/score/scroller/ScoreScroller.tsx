import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

import { withTab, withVideo, withRAFLoop } from 'enhancers';

class ScoreScroller extends React.Component<any, any> {
  currLine: number = 0;
  scoreContainer: any = null;
  scrollPositions: Array<number> = [];

  componentWillReceiveProps(nextProps: any): void {
    const { RAFLoop, isVideoActive } = nextProps;

    this.updateRefs();

    if (isVideoActive) {
      this.registerRAFLoop();
    } else {
      this.unregisterRAFLoop();
    }
  }

  componentWillUnmount(): void {
    this.unregisterRAFLoop();
  }

  registerRAFLoop(): void {
    if (!this.props.RAFLoop.has()) {
      this.props.RAFLoop.register({
        name: 'ScoreScroller.updateScroll',
        precedence: 6,
        onAnimationLoop: this.updateScroll
      });
    }
  }

  unregisterRAFLoop(): void {
    this.props.RAFLoop.unregister('ScoreScroller.updateScroll');
  }

  updateRefs = (): void => {
    this.scoreContainer = $('#ScoreContainer')[0];
    this.scrollPositions = Array.from($('.ScoreLine')).map(el => $(el).offset().top - $(el).offsetParent().offset().top);
  }

  updateScroll = (): void => {
    if (this.scoreContainer === null || this.scrollPositions.length === 0) {
      return;
    }

    try {
      const lineIndex = this.props.provider.player.scrollSpec.lowTick.staveIndex;
      this.scoreContainer.scrollTop = this.scrollPositions[lineIndex];
    } catch (error) {
      // noop
    }
  }

  render(): any {
    return null;
  }
}

export default compose(
  withTab,
  withVideo,
  withRAFLoop,
  onlyUpdateForKeys(['updatedAt', 'provider', 'isVideoActive'])
)(ScoreScroller);
