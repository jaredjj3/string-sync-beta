import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { Gradient, MaestroAdapter, Video, Nav, Fretboard, Tab } from 'components';
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
  background: black;
`;

const NotationEdit = () => (
  <NotationEditOuter>
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
  </NotationEditOuter>
);

export default enhance(NotationEdit);
