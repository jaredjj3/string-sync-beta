import * as React from 'react';
import styled from 'styled-components';
import { truncate } from 'lodash';

const Outer = (styled.div as any)`
  z-index: 101;
  transition: 500ms;
  opacity: ${props => props.isMaskActive ? 1 : 0};
  font-family: ${props => props.font};
  height: 290px;
  position: relative;
  background: ${props => props.isMaskActive ? 'white' : 'transparent'};
`;
const Inner = (styled.div as any)`
  position: absolute;
  transition: 500ms;
  left: ${props => props.isMaskActive ? 0 : -25}px;
  width: 100%;
`;
const Contents = styled.div`
  padding: 25px;
  height: 295px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  writing-mode: tb-rl;
  text-orientation: upright;
  padding: 20px;
  padding-left: 0;
  border-right: 10px solid #fc354c;

  h1 {
    margin: 0;
    font-size: 54px;
    font-weight: 700;
  }
`;
const Right = styled.div`
  margin: 20px;

  h1 {
    font-size: 54px;
    margin-bottom: 0;
  }

  h2 {
    font-size: 36px;
    font-weight: 100;
    margin-bottom: 15px;
  }
`;
const AppName = styled.h4`
  color: darkgray;
  font-weight: 100;
  font-size: 18px;
`;

const RecordingZoneMask = props => (
  <Outer {...props}>
    <Inner isMaskActive={props.isMaskActive}>
      <Contents>
        <Left>
          <h1>TAB</h1>
        </Left>
        <Right>
          <h1>{truncate(props.line1, { length: 23 })}</h1>
          <h2>{truncate(props.line2, { length: 37 })}</h2>
          <AppName>with ❤️ from stringsync.com</AppName>
        </Right>
      </Contents>
    </Inner>
  </Outer>
);

export default RecordingZoneMask;
