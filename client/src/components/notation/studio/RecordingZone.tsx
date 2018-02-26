import * as React from 'react';
import styled from 'styled-components';
import { Video, Score, Fretboard, RecordingZoneMask } from 'components';

const Outer = styled.div`
  width: 800px;
  height: 800px;
  position: relative;
`;
const VideoContainer = (styled.div as any) `
  background: black;
  height: 320px;
  width: 100%;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;

  iframe {
    height: ${props => props.height}px;
    width: ${props => props.width}px;
  }
`;
const Spacer = styled.div`
  height: 320px;
  width: 100%;
  background: black;
`;
const FretboardContainer = styled.div`
  height: 185px;
  width: 100%;
  background: black;
`;
const ScoreContainer = styled.div`
  width: 100%;
  height: 291px;
  overflow: hidden;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
`;

const RecordingZone = props => (
  <Outer>
    <RecordingZoneMask {...props} />
    <VideoContainer {...props}>
      <Video onEnd={props.handleVideoEnd} />
    </VideoContainer>
    <Spacer />
    <FretboardContainer>
      <Fretboard />
    </FretboardContainer>
    <ScoreContainer>
      <Score
        caret
        scroller
        hideScroll
        width={770}
      />
    </ScoreContainer>
  </Outer>
);

export default RecordingZone;
