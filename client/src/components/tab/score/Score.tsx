import React from 'react';
import { connect } from 'react-redux';
import ScoreLine from './line';
import ScoreScroller from './scroller';
import { compose } from 'recompose';
import { withTab } from 'enhancers';

const enhance = compose(
  withTab
);

export default enhance(({ tab }) => (
  <ul className="Score">
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
