import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

import DesktopLanding from './desktop';
import MobileLanding from './mobile';

import { withDeviceType } from 'enhancers';

export default compose(
  withDeviceType,
  branch(
    ({ deviceType }) => deviceType === 'MOBILE',
    renderComponent(MobileLanding),
    renderComponent(DesktopLanding)
  )
)();
