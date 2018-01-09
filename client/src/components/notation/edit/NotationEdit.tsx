import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { Gradient, MaestroAdapter, Video, Nav, Fretboard, Tab } from 'components';
import { withNotation } from 'enhancers';
import { NotationEditor } from './';

const enhance = compose(
  withNotation,
  lifecycle({
    componentDidMount(): void {
      const notationId = this.props.match.params.id;
      this.props.notation.dispatch.fetchNotation(notationId);
    }
  })
);

const NotationEdit = () => (
  <div className="NotationEdit">
    <Gradient />
    <Nav />
    <MaestroAdapter />
    <Video />
    <Fretboard />
    <NotationEditor />
    <Tab
      withCaret
      allowOverflow
    />
  </div>
);

export default enhance(NotationEdit);
