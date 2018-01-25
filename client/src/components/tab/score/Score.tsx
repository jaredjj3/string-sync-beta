import * as React from 'react';
import { compose, mapProps, shouldUpdate } from 'recompose';
import { withTab } from 'enhancers';
import { ScoreLine, CaretController, LoopCaretController, ScrollManager } from './';
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

const ScoreOuter = (styled.div as any)`
  background: white;
  height: 260px;
  overflow: ${props => props.allowOverflow ? '' : 'hidden'};
  padding-bottom: 100px;
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
  <ScoreOuter id="Score" allowOverflow={allowOverflow}>
    {withCaret ? <CaretController /> : null}
    {withCaret ? <LoopCaretController /> : null}
    <ScrollManager />
    <ScoreLines
      tab={tab}
      withCaret={withCaret}
    />
  </ScoreOuter>
);

export default enhance(Score);
