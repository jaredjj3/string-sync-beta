import * as React from 'react';
import { compose, withProps, shouldUpdate } from 'recompose';
import * as classNames from 'classnames';
import { withTab } from 'enhancers';
import { ScoreLine, CaretAdapter, ScrollManager } from './';
import { Line } from 'services';
import { hash } from 'ssUtil';

const enhance = compose(
  withTab,
  withProps(props => ({
    rootClassNames: classNames(
      'Score',
      {
        'Score--noScroll': !props.allowOverflow
      }
    )
  })),
  shouldUpdate((currProps, nextProps) => {
    const { instance } = nextProps.tab.state;
    return instance && !instance.error;
  })
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
    <ScoreLines
      tab={tab.state.instance}
      withCaret={withCaret}
    />
    {withCaret ? <CaretAdapter /> : null}
    <ScrollManager /> {/* rendering order matters! */}
  </div>
);

export default enhance(Score);
