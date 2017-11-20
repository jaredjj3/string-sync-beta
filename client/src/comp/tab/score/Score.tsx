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

export default enhance(({ provider }) => (
  <ul>
    <ScoreScroller />
    {
      provider.vextabs.map((vextab, index) => (
        <li key={`score-line-${index}`} style={{ paddingTop: index === 0 ? '0px' : '50px' }}>
          <ScoreLine vextab={vextab} />
        </li>
      ))
    }
  </ul>
));
