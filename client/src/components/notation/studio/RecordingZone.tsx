import * as React from 'react';
import styled from 'styled-components';
import { Video, Score, Fretboard } from 'components';

const Outer = styled.div`
  border: 3px solid lime;
  width: 800px;
  height: 800px;
  position: relative;
`;
const Mask = (styled.div as any) `
  position: absolute;
  top: 502px;
  left: 0;
  height: 293px;
  width: 794px;
  background: white;
  z-index: 101;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 10px solid #fc354c;
  opacity: ${props => props.isMaskActive ? 1 : 0};
  font-family: ${props => props.font};
`;
const MaskLeft = (styled.div as any) `
  position: absolute;
  top: 25px;
  transition: 500ms;
  left: ${props => props.isMaskActive ? 25 : 0}px;

  h1, h2, h3 {
    margin-bottom: 0;
    align-text: center;
    transition: 500ms;
    display: inline-block;
  }
`;
const MaskLine = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 72px;
    font-weight: 700;
  }

  h2 {
    font-size: 48px;
    font-weight: 500;
  }

  h3 {
    font-size: 24px;
    font-weight: 300;
  }
`;
const Tag = styled.span`
  padding: 5px;
  margin: 7px;
  border: 2px solid #fc354c;
  background: #ffbfc6;
  border-radius: 5px;
`;
const AppName = styled.h4`
  color: darkgray;
  margin-top: 10px;
  font-weight: 100;
  font-size: 18px;
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
    <Mask {...props}>
      <MaskLeft isMaskActive={props.isMaskActive}>
        <MaskLine>
          <h1>{props.notation.state.songName}</h1>
        </MaskLine>
        <MaskLine>
          <h2>{`by ${props.notation.state.artistName}`}</h2>
          {
            props.notation.state.tags.map(tag => (
              <Tag key={`notation-studio-tag-${tag}`}>
                <h3>{tag}</h3>
              </Tag>
            ))
          }
        </MaskLine>
        <MaskLine>
          <AppName>stringsync.com</AppName>
        </MaskLine>
      </MaskLeft>
    </Mask>
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
