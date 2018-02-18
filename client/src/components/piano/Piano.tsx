import * as React from 'react';
import { compose, withState, lifecycle, branch, renderNothing } from 'recompose';
import { PianoKeys, PianoController } from './';
import { hasGlobalProps, identity } from 'enhancers';
import styled from 'styled-components';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  hasGlobalProps('piano', () => window.ss.globalProps),
  branch(
    props => props.isVisible,
    identity,
    renderNothing
  )
);

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

export default enhance(Piano);
