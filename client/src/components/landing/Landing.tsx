import * as React from 'react';
import { compose, branch, shouldUpdate, renderComponent, createSink } from 'recompose';
import withViewport from 'enhancers/withViewport';
import DesktopLanding from './desktop';
import { withRouter } from 'react-router';

const redirectToLibrary = ({ history }) => {
  history.push('/library');
};

const enhance = compose(
  withViewport,
  withRouter,
  shouldUpdate((props, nextProps) => (
    props.viewport.state.type !== nextProps.viewport.state.type
  )),
  branch(
    ({ viewport }) => viewport.state.type === 'DESKTOP',
    renderComponent(DesktopLanding),
    renderComponent(createSink(redirectToLibrary))
  )
);

export default enhance(() => null);
