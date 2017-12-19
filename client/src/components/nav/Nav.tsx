import * as React from 'react';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import DesktopNav from './desktop';
import MobileNav from './mobile';
import withViewport from 'enhancers/withViewport';

const Nav = renderNothing();

const enhance = compose(
  withViewport,
  branch(
    ({ viewport }) => viewport.state.type === 'MOBILE',
    renderComponent(MobileNav),
    renderComponent(DesktopNav)
  )
);

export default enhance(Nav);
