import * as React from 'react';
import { compose } from 'recompose';
import { PianoKeys } from './';
import styled from 'styled-components';

const enhance = compose(

);

const KeyboardOuter = styled.div`
  color: black;
`;
const KeyboardInner = styled.div`
`;

const Keyboard = () => (
  <KeyboardOuter className="Keyboard">
    <KeyboardInner>
      <PianoKeys />
    </KeyboardInner>
  </KeyboardOuter>
);

export default enhance(Keyboard);
