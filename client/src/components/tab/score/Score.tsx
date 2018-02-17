import * as React from 'react';
import { compose, mapProps, withProps, shouldUpdate } from 'recompose';
import { withTab, withNotation } from 'enhancers';
import { ScoreLine, CaretController, LoopCaretController, ScoreScroller } from './';
import { Line } from 'services';
import { hash } from 'ssUtil';
import styled from 'styled-components';
import { Element as ScrollElement } from 'react-scroll';

const enhance = compose(
  withTab,
  withNotation,
  mapProps(props => ({
    tab: props.tab.state.instance,
    withCaret: props.withCaret,
    allowOverflow: props.allowOverflow,
    songName: props.notation.state.songName,
    artistName: props.notation.state.artistName,
    transcriberName: props.notation.state.transcriber.username
  })),
  withProps(({ songName, artistName, transcriberName }) => ({
    titleLine1: songName && artistName ? `${songName} by ${artistName}` : 'loading...',
    titleLine2: transcriberName ? `transcribed by ${transcriberName}` : ''
  })),
  shouldUpdate((currProps, nextProps) => nextProps.tab && !nextProps.tab.error)
);

const ScoreOuter = styled.div`
  background: white;
  max-height: 1040px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;
const ScoreInner = styled.div`
  height: 100%;
`;
const Spacer = styled.div`
  height: 260px;
  width: 100%;
  background: white;
`;
const Title = styled.div`
  text-align: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h4 {
    color: darkgray;
  }
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

const Score = ({ rootClassNames, tab, withCaret, allowOverflow, titleLine1, titleLine2 }) => (
  <ScoreOuter id="Score">
    {withCaret ? <CaretController /> : null}
    {withCaret ? <LoopCaretController /> : null}
    <ScoreScroller />
    <Spacer />
    <Spacer />
    <ScrollElement name="score-title">
      <Title>
        <h2>{titleLine1}</h2>
        <h4>{titleLine2}</h4>
      </Title>
    </ScrollElement>
    <ScoreLines tab={tab} withCaret={withCaret} />
    <Spacer />
    <Spacer />
    <Spacer />
  </ScoreOuter>
);

export default enhance(Score);
