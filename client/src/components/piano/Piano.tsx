import * as React from 'react';
import { compose, withState, lifecycle, branch, renderNothing } from 'recompose';
import { PianoKeys, PianoController } from './';
import styled from 'styled-components';

const enhance = compose(
  withState('isVisible', 'setVisibility', false),
  lifecycle({
    componentDidMount(): void {
      window.ss.maestro.pianoProps = this.props;
    },
    componentWillUnmount(): void {
      window.ss.maestro.pianoProps = null;
    }
  }),
  branch(
    props => props.isVisible,
    i => i,
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
