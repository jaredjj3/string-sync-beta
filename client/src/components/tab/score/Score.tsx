import * as React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { withTab, textWhileLoading } from 'enhancers';
import ScoreLine from './ScoreLine';
import { Line } from 'services';
import { hash } from 'ssUtil';

const enhance = compose(
  withTab,
  textWhileLoading(({ tab }) => tab.state.provider === null),
  shouldUpdate((currProps, nextProps) => {
    const { provider } = nextProps.tab.state;

    return provider && !provider.error;
  })
);

const ScoreLines = ({ provider }) => {
  if (!provider) {
    return null;
  } else {
    return (
      provider.lines.map((line: Line) => (
        <ScoreLine
          key={`score-line-${line.number}-${hash(line.vextabString)}`}
          vextabString={line.vextabString}
          number={line.number}
        />
      ))
    );
  }
};

const Score = ({ tab }) => (
  <div className="Score">
    <ScoreLines provider={tab.state.provider} />
  </div>
);

export default enhance(Score);
