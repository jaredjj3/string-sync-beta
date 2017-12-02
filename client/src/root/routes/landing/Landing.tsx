import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, branch, renderComponent } from 'recompose';
import DesktopLanding from './desktop';
import MobileLanding from './mobile';
import { withViewport } from 'enhancers';

export default compose(
  withRouter,
  withViewport,
  branch(
    ({ viewport }) => viewport.type === 'MOBILE',
    renderComponent(MobileLanding),
    renderComponent(DesktopLanding)
  )
)();
