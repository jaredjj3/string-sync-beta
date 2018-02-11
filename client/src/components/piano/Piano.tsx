import * as React from 'react';
import { compose } from 'recompose';
import { PianoKeys } from './';
import styled from 'styled-components';

const enhance = compose(

);

const PianoOuter = styled.div`
  color: black;
`;
const PianoInner = styled.div`
`;

const Piano = () => (
  <PianoOuter className="Piano">
    <PianoInner>
      <PianoKeys />
    </PianoInner>
  </PianoOuter>
);

export default enhance(Piano);
