import * as React from 'react';
import { compose, mapProps, shouldUpdate } from 'recompose';
import { withTab } from 'enhancers';
import { ScoreLine, CaretAdapter, ScrollManager } from './';
import { Line } from 'services';
import { hash } from 'ssUtil';
import styled from 'styled-components';

const enhance = compose(
  withTab,
  mapProps(props => ({
    tab: props.tab.state.instance,
    withCaret: props.withCaret,
    allowOverflow: props.allowOverflow
  })),
  shouldUpdate((currProps, nextProps) => nextProps.tab && !nextProps.tab.error)
);

const ScoreWrapper = (styled.div as any)`
  background: white;
  height: 260px;
  overflow: ${props => props.allowOverflow ? '' : 'hidden'}
`;

const ScoreLines = ({ tab, withCaret }) => {
  if (!tab) {
    return null;
  } else {
    const vextabStringHash = hash(tab.vextabString);
    return (
      tab.lines.map((line: Line, ndx) => (
        <ScoreLine
          line={line}
          withCaret={withCaret}
          key={`score-line-${line.number}-${vextabStringHash}`}
        />
      ))
    );
  }
};

const Score = ({ rootClassNames, tab, withCaret, allowOverflow }) => (
  <ScoreWrapper id="Score" allowOverflow={allowOverflow}>
    {withCaret ? <CaretAdapter /> : null}
    <ScrollManager />
    <ScoreLines
      tab={tab}
      withCaret={withCaret}
    />
  </ScoreWrapper>
);

export default enhance(Score);
