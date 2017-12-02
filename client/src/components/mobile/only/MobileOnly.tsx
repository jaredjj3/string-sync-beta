import React from 'react';
import { compose } from 'recompose';

import { permitViewportType } from 'enhancers';

const MobileOnly = ({ children }) => (
  <div className="MobileOnly">
    {children}
  </div>
);

export default compose(
  permitViewportType('MOBILE')
)(MobileOnly);
