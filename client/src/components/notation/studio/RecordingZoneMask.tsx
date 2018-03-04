import * as React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Textfit } from 'react-textfit';

const Mask = (styled.div as any)`
  z-index: 101;
  transition: 500ms;
  opacity: ${props => props.isMaskActive ? 1 : 0};
  font-family: ${props => props.font};
`;
const MaskContents = (styled.div as any)`
  width: ${props => props.mode === 'instagram' ? 800 : 1440}px;
  height: 295px;
  position: absolute;
  background: white;
  box-sizing: border-box;
  padding-left: 25px;
  padding-top: 25px;
  transition: 500ms;
  left: ${props => props.isMaskActive ? 0 : -25}px;

  h1, h2, h3 {
    margin-bottom: 0;
    align-text: center;
    transition: 500ms;
    display: inline-block;
  }
`;
const MaskLeft = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-right: 30px;
  transform: translateY(-23px);

  h1 {
    font-size: 96px;
    height: 80px;
    font-weight: 100;
  }
`;
const MaskRight = (styled(Col) as any)`
  padding-left: 30px;
  border-left: 10px solid #fc354c;
  width: ${props => props.mode === 'instagram' ? 650 : 1200}px;
  color: #222;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    font-size: 36px;
    font-weight: 400;
  }

  h3 {
    font-size: 18px;
    font-weight: 200;
  }
`;
const MaskLine = styled.div`
  margin-top: 5px;
`;
const BottomMaskLine = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Tag = styled.span`
  padding: 8px;
  margin-right: 7px;
  border: 2px solid #fc354c;
  background: #ffbfc6;
  border-radius: 5px;
  text-align: center;
`;
const AppName = styled.h4`
  color: darkgray;
  margin-top: 10px;
  font-weight: 100;
  font-size: 18px;
`;

const RecordingZoneMask = props => (
  <Mask {...props}>
    <MaskContents {...props}>
      <Row type="flex">
        <MaskLeft>
          <h1>T</h1>
          <h1>A</h1>
          <h1>B</h1>
        </MaskLeft>
        <MaskRight mode={props.mode}>
          <MaskLine>
            <Textfit mode="single">
              {props.line1}
            </Textfit>
          </MaskLine>
          <MaskLine>
            <h2>{props.line2}</h2>
          </MaskLine>
          <BottomMaskLine>
            <AppName>stringsync.com</AppName>
            <div>
              {
                props.notation.state.tags.map(tag => (
                  <Tag key={`notation-studio-tag-${tag}`}>
                    <h3>{tag}</h3>
                  </Tag>
                ))
              }
            </div>
          </BottomMaskLine>
        </MaskRight>
      </Row>
    </MaskContents>
  </Mask>
);

export default RecordingZoneMask;
