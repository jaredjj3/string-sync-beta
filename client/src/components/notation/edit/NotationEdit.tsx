import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { Gradient, Maestro, Video, Nav, Fretboard, Tab } from 'components';
import { withNotation } from 'enhancers';
import NotationEditor from './editor';

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
    <Maestro />
    <Video />
    <Fretboard />
    <NotationEditor />
    <Tab allowOverflow />
  </div>
);

export default enhance(NotationEdit);
