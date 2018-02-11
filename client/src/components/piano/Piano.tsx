import * as React from 'react';
import { PianoKeys, PianoController } from './';
import styled from 'styled-components';

const PianoOuter = styled.div`
  color: black;
`;
const PianoInner = styled.div`
`;

const Piano = () => (
  <PianoOuter className="Piano">
    <PianoInner>
      <PianoController />
      <PianoKeys />
    </PianoInner>
  </PianoOuter>
);

export default Piano;
