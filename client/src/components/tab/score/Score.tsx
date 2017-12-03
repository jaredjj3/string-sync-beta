import React from 'react';
import { connect } from 'react-redux';
import ScoreLine from './line';
import ScoreScroller from './scroller';
import { compose, onlyUpdateForKeys } from 'recompose';
import { withTab } from 'enhancers';

const enhance = compose(
  withTab,
  onlyUpdateForKeys(['updatedAt'])
);

export default enhance(({ tab }) => (
  <ul>
    <ScoreScroller />
    {
      tab.provider.vextabs.map((vextab, ndx) => (
        <li key={`score-line-${ndx}`} style={{ paddingTop: ndx === 0 ? '0px' : '50px' }}>
          <ScoreLine vextab={vextab} lineNum={ndx} />
        </li>
      ))
    }
  </ul>
));
