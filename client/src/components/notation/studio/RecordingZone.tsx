import * as React from 'react';
import styled from 'styled-components';
import { Video, Score, Fretboard, RecordingZoneMask } from 'components';

const Outer = (styled.div as any)`
  width: ${props => props.recordingZoneWidthPx - 10}px;
  height: ${props => props.recordingZoneHeightPx - 10}px;
  position: relative;
`;
const VideoContainer = (styled.div as any) `
  background: black;
  height: 320px;
  width: 100%;
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  display: flex;
  justify-content: center;

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
const MaskContainer = styled.div`
  position: relative;
  z-index: 101;
  background: white;
`;

const RecordingZone = props => (
  <Outer {...props}>
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
        width={props.recordingZoneWidthPx - 30}
      />
    </ScoreContainer>
    <MaskContainer>
      <RecordingZoneMask {...props} />
    </MaskContainer>
  </Outer>
);

export default RecordingZone;
