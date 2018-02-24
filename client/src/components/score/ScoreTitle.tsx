import * as React from 'react';
import { compose, mapProps } from 'recompose';
import styled from 'styled-components';
import { Element as ScrollElement } from 'react-scroll';

const enhance = compose(
  mapProps(({ songName, artistName, transcriberName }) => ({
    line1: songName && artistName ? `${songName} by ${artistName}` : 'loading...',
    line2: transcriberName ? `transcribed by ${transcriberName}` : ''
  }))
);

const Outer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
const Line1 = styled.h2`
  color: black;
`;
const Line2 = styled.h4`
  color: darkgray;
`;

const ScoreTitle = ({ line1, line2 }) => (
  <Outer>
    <ScrollElement name="score-title" />
    <Line1>{line1}</Line1>
    <Line2>{line2}</Line2>
  </Outer>
);

export default enhance(ScoreTitle);
