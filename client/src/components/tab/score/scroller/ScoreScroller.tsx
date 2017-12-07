
import React from 'react';
import { compose } from 'recompose';
import { withTab, withVideo, withRaf } from 'enhancers';

class ScoreScroller extends React.Component<any, any> {
  currLine: number = 0;
  scoreContainer: any = null;
  scrollPositions: Array<number> = [];
  scrollDir: string = 'DOWN';

  componentDidMount(): void {
    this.registerRAFLoop();
  }

  componentWillReceiveProps(nextProps: any): void {
    this.updateRefs();
  }

  componentWillUnmount(): void {
    this.unregisterRAFLoop();
  }

  registerRAFLoop(): void {
    const RAFLoop = this.props.raf.loop;

    if (!RAFLoop.has('ScoreScroller.updateScroll')) {
      RAFLoop.register({
        name: 'ScoreScroller.updateScroll',
        precedence: 6,
        onAnimationLoop: this.updateScroll
      });
    }
  }

  unregisterRAFLoop(): void {
    this.props.raf.loop.unregister('ScoreScroller.updateScroll');
  }

  updateRefs = (): void => {
    this.scoreContainer = $('#ScoreContainer')[0];
    this.scrollPositions = Array.from($('.ScoreLine')).map(el => $(el).position().top);
  }

  updateScroll = (dt: number): void => {
    if (this.scoreContainer === null || this.scrollPositions.length === 0) {
      return;
    }

    try {
      // const { scrollSpec } = this.props.tab.provider.player;
      // if (scrollSpec) {
      //   const lineIndex = scrollSpec.lowTick.staveIndex;
      //   this.scoreContainer.scrollTop = this.scrollPositions[lineIndex];
      // }
      switch (this.scrollDir) {
        case 'UP':
          this.scoreContainer.scrollTop--;
          break;
        case 'DOWN':
          this.scoreContainer.scrollTop++;
          break;
        default:
          break;
      }
      if (this.scoreContainer.scrollTop === 0) {
        this.scrollDir = 'DOWN';
      } else if (this.scoreContainer.scrollTop > 300) {
        this.scrollDir = 'UP';
      }
    } catch (error) {
      console.error(error);
    }
  }

  render(): any {
    return null;
  }
}

const enhance = compose(
  withTab,
  withVideo,
  withRaf
);

export default enhance(ScoreScroller);
