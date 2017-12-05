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
  <ul className="Score">
    {withScoreScroller ? <ScoreScroller /> : null}
    {
      tab.provider.vextabs.map((vextab, ndx) => (
        <li key={`score-line-${ndx}`} style={{ paddingTop: ndx === 0 ? '0px' : '50px' }}>
          <ScoreLine vextab={vextab} lineNum={ndx} />
        </li>
      ))
    }
  </ul>
));
