import * as React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const enhance = compose(

);

const BlackPianoKeyOuter = styled.div`
  position: relative;
  z-index: 11;
  color: white;

  .PianoKey--lit,
  .PianoKey--pressed,
  .PianoKey--justPressed {
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }

  .PianoKey--pressed {
    background: #fc354c;
  }

  &.PianoKey--justPressed {
    background: #fc354c;
    transition: background ease-in 10ms;
  }
`;
const BlackPianoKeyInner = styled.div`
  width: 14px;
  height: 54px;
  left: -7px;
  top: 1px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  transition: background ease-in 100ms;
  background: black;
  position: absolute;
  box-sizing: border-box;
`;

const BlackPianoKey = ({ note, rootClassNames }) => (
  <BlackPianoKeyOuter>
    <BlackPianoKeyInner className={rootClassNames}>
    </BlackPianoKeyInner>
  </BlackPianoKeyOuter>
);

export default compose(BlackPianoKey);
