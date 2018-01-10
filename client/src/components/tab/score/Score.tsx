import * as React from 'react';
import { compose, mapProps, withProps, shouldUpdate } from 'recompose';
import * as classNames from 'classnames';
import { withTab } from 'enhancers';
import { ScoreLine, CaretAdapter, ScrollManager } from './';
import { Line } from 'services';
import { hash, elvis } from 'ssUtil';

const enhance = compose(
  withTab,
  mapProps(props => ({
    tab: props.tab.state.instance,
    withCaret: props.withCaret,
    allowOverflow: props.allowOverflow
  })),
  withProps(props => ({
    rootClassNames: classNames(
      'Score',
      {
        'Score--noScroll': !props.allowOverflow
      }
    )
  })),
  shouldUpdate((currProps, nextProps) => !elvis(nextProps.tab, 'error'))
);

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

const Score = ({ rootClassNames, tab, withCaret }) => (
  <div id="Score" className={rootClassNames}>
    {withCaret ? <CaretAdapter /> : null}
    <ScrollManager />
    <ScoreLines
      tab={tab}
      withCaret={withCaret}
    />
  </div>
);

export default enhance(Score);
