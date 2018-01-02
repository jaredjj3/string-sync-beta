import * as React from 'react';
import { compose, withProps, shouldUpdate } from 'recompose';
import { withTab, textWhileLoading } from 'enhancers';
import ScoreLine from './ScoreLine';
import CaretManager from './CaretManager';
import ScrollManager from './ScrollManager';
import { Line } from 'services';
import { hash } from 'ssUtil';
import * as classNames from 'classnames';

const enhance = compose(
  withTab,
  textWhileLoading(({ tab }) => tab.state.instance === null),
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
    return (
      tab.lines.map((line: Line, ndx) => (
        <ScoreLine
          withCaret={withCaret}
          key={`score-line-${line.number}-${hash(line.vextabString)}`}
          number={line.number}
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
    {withCaret ? <CaretManager /> : null}
    <ScrollManager /> {/* rendering order matters! */}
  </div>
);

export default enhance(Score);
