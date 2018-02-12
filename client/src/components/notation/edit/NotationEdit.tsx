import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import {
  Gradient, MaestroController, Video, Nav,
  Fretboard, Tab, NotationControls, Piano
} from 'components';
import { withNotation } from 'enhancers';
import { NotationEditor } from './';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
    },
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const NotationEditOuter = styled.div`
  .NotationEdit {
    color: white;
    overflow-x: hidden;

    .Video {
      background: black;
      height: 30vh;
      width: 100%;

      iframe {
        height: 100%;
        width: 100%;
        min-height: 30vh;
      }
    }
  }
`;
const NotationEditInner = styled.div``;
const TabOuter = styled.div`
  #Score .ScoreLine:last-child {
    margin-bottom: 500px;
  }
`;

const NotationEdit = () => (
  <NotationEditOuter>
    <NotationEditInner className="NotationEdit">
      <Gradient />
      <Nav />
      <MaestroController />
      <Video withInitializer />
      <Fretboard />
      <Piano />
      <NotationEditor />
      <TabOuter>
        <Tab withCaret allowOverflow />
      </TabOuter>
      <NotationControls />
    </NotationEditInner>
  </NotationEditOuter>
);

export default enhance(NotationEdit);
