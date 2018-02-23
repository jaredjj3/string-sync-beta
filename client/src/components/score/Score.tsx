import * as React from 'react';
import { compose, mapProps, withProps, withState, shouldUpdate, lifecycle } from 'recompose';
import { Element as ScrollElement } from 'react-scroll';
import styled from 'styled-components';
import { isEqual, get } from 'lodash';
import { hash } from 'ssUtil';
import { withNotation } from 'enhancers';
import { Score as ScoreService } from 'services';
import {
  ScoreController, CaretController, LoopCaretController,
  ScoreScroller, ScoreLine, ScoreTitle
} from 'components';

const enhance = compose(
  mapProps(props => ({
    width: props.width,
    caret: Boolean(props.caret),
    scroller: Boolean(props.scroller)
  })),
  withNotation,
  // The purpose of the score prop is solely to trigger rerenders
  // in consuming components.
  withState('score', 'setScore', null),
  withProps(props => ({
    maybeCreateScore: nextProps => {
      const shouldCreateScore = (
        !nextProps.score ||
        nextProps.score.vextabString !== nextProps.notation.state.vextabString ||
        nextProps.score.width !== nextProps.width
      );

      if (shouldCreateScore) {
        const score = new ScoreService(nextProps.notation.state.vextabString, nextProps.width);
        window.ss.maestro.score = score;
        nextProps.setScore(score);
      }
    }
  })),
  lifecycle({
    componentWillReceiveProps(nextProps): void {
      nextProps.maybeCreateScore(nextProps);
    },
    componentWillUnmount(): void {
      window.ss.maestro.score = null;
      this.props.setScore(null);
    }
  }),
  shouldUpdate((props, nextProps) => props.score !== nextProps.score)
);

const Head = styled.div`
  display: none;
`;
const Body = styled.div`
  min-height: 520px;
`;
const Spacer = styled.div`
  height: 300px;
  width: 100%;
  background: white;
`;

const ScoreLines = ({ score, caret }) => {
  const vextabString = get(score, 'vextabString');

  if (!vextabString) {
    return null;
  } else {
    const vextabStringHash = hash(vextabString);
    return (
      score.lines.map(line => (
        <ScoreLine
          key={`score-line-${line.number}-${vextabStringHash}`}
          line={line}
          caret={caret}
        />
      )
    ));
  }
};

const Score = ({ width, caret, scroller, notation, score }) => (
  <div id="Score">
    <Head>
      <ScoreController width={width} caret={caret} score={score} />
      {caret ? <CaretController /> : null}
      {caret ? <LoopCaretController /> : null}
      {scroller ? <ScoreScroller /> : null}
    </Head>
    <Body>
      <ScoreTitle
        songName={notation.state.songName}
        artistName={notation.state.artistName}
        transcriberName={notation.state.transcriber.username}
      />
      <ScoreLines score={score} caret={caret} />
      <Spacer />
    </Body>
  </div>
);

export default enhance(Score);
