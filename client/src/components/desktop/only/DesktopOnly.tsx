import React from 'react';
import { compose } from 'recompose';

import { permitDevice } from 'enhancers';

const DesktopOnly = ({ children }) => (
  <div className="DesktopOnly">
    {children}
  </div>
);

export default compose(
  permitDevice('DESKTOP')
)(DesktopOnly);
