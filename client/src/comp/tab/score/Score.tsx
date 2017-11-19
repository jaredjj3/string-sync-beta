import React from 'react';
import { connect } from 'react-redux';

import ScoreLine from './line';
import { compose, lifecycle, onlyUpdateForKeys } from 'recompose';
import { withTab } from 'enhancers';

const enhance = compose(
  withTab,
  onlyUpdateForKeys(['updatedAt'])
);

export default enhance(({ provider }) => (
  <ul>
    {
      provider.vextabs.map((vextab, index) => (
        <li key={`score-line-${index}`}>
          <ScoreLine vextab={vextab} />
        </li>
      ))
    }
  </ul>
));
