import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { Gradient, MaestroAdapter, Video, Nav, Fretboard, Tab, NotationControls } from 'components';
import { withNotation } from 'enhancers';
import { NotationEditor } from './';
import styled from 'styled-components';

const enhance = compose(
  withNotation,
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
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

const NotationEdit = () => (
  <NotationEditOuter>
    <NotationEditInner className="NotationEdit">
      <Gradient />
      <Nav />
      <MaestroAdapter />
      <Video withInitializer />
      <Fretboard />
      <NotationEditor />
      <Tab
        withCaret
        allowOverflow
      />
      <NotationControls />
    </NotationEditInner>
  </NotationEditOuter>
);

export default enhance(NotationEdit);
