import * as React from 'react';
import styled from 'styled-components';

const Mask = (styled.div as any) `
  position: absolute;
  top: 502px;
  left: 0;
  height: 298px;
  width: 800px;
  background: white;
  z-index: 101;
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 10px solid #fc354c;
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

const RecordingZoneMask = props => (
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
);

export default RecordingZoneMask;
