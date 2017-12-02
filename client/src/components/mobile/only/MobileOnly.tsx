import React from 'react';
import { compose } from 'recompose';

import { permitDevice } from 'enhancers';

const MobileOnly = ({ children }) => (
  <div className="MobileOnly">
    {children}
  </div>
);

export default compose(
  permitDevice('MOBILE')
)(MobileOnly);
