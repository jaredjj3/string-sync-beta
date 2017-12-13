import React from 'react';
import ScoreLine from './line';
import ScoreScroller from './scroller';
import { compose, shouldUpdate } from 'recompose';
import { withTab } from 'enhancers';

const enhance = compose(
  withTab,
  shouldUpdate((props, nextProps) => !nextProps.tab.provider.parseError)
);

export default enhance(({ tab, withScoreScroller }) => (
  <div id="Score" className="Score">
    {withScoreScroller ? <ScoreScroller /> : null}
    {
      tab.provider.vextabs.map((vextab, ndx) => (
        <div
          className="Score__lineContainer"
          key={`score-line-${ndx}`}
          style={{ paddingTop: ndx === 0 ? '0px' : '50px' }}
        >
          <ScoreLine vextab={vextab} lineNum={ndx} />
        </div>
      ))
    }
  </div>
));
