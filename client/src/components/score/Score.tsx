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
    measuresPerLine: props.measuresPerLine || ScoreService.getMeasuresPerLine(props.width),
    caret: Boolean(props.caret),
    scroller: Boolean(props.scroller),
    hideScroll: Boolean(props.hideScroll),
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
        const { maestro } = window.ss;
        try {
          maestro.errors = [];
          const score = new ScoreService(
            nextProps.notation.state.vextabString, nextProps.width, nextProps.measuresPerLine
          );
          maestro.score = score;
          nextProps.setScore(score);
        } catch (error) {
          maestro.errors.push(error);
        }
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
const Body = (styled.div as any)`
  background: white;
  max-height: 1040px;
  overflow-x: hidden;
  overflow-y: ${props => props.hideScroll ? 'hidden' : 'auto'};
  -webkit-overflow-scrolling: touch;
`;
const Spacer = styled.div`
  height: 800px;
  width: 100%;
  background: white;
`;

const ScoreLines = ({ score, caret }) => {
  const vextabString = get(score, 'vextabString');

  if (!vextabString) {
    return null;
  } else {
    const vextabStringHash = hash(`${vextabString}${score.width}`);
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

const Score = ({ width, caret, scroller, notation, score, hideScroll }) =>(
  <div>
    <Head>
      <ScoreController width={width} caret={caret} score={score} />
      {caret ? <CaretController /> : null}
      {caret ? <LoopCaretController /> : null}
      {scroller ? <ScoreScroller /> : null}
    </Head>
    <Body id="Score" hideScroll={hideScroll}>
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
