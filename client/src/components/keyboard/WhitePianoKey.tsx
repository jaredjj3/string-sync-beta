import * as React from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

const enhance = compose(

);

const WhitePianoKeyOuter = styled.div`
  z-index: 10;
  color: black;

  &:last-child {
    border-right: 1px solid black;
  }

  .PianoKey--lit {
    background: #ffeff1;
  }

  .PianoKey--pressed {
    background: #fc354c;
  }

  .PianoKey--justPressed {
    background: #eb2b41;
  }
`;
const WhitePianoKeyInner = styled.div`
  width: 24px;
  height: 98px;
  box-sizing: border-box;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  background: white;
`;

const WhitePianoKey = ({ note, rootClassNames }) => (
  <WhitePianoKeyOuter>
    <WhitePianoKeyInner className={rootClassNames}>
    </WhitePianoKeyInner>
  </WhitePianoKeyOuter>
);

export default compose(WhitePianoKey);
