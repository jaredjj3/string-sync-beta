import React from 'react';
import { compose } from 'recompose';

import { permitViewportType } from 'enhancers';

const DesktopOnly = ({ children }) => (
  <div className="DesktopOnly">
    {children}
  </div>
);

export default compose(
  permitViewportType('DESKTOP')
)(DesktopOnly);
