import React from 'react';
import { compose } from 'recompose';

import { restrictDevice } from 'enhancers';

const DesktopOnly = ({ children }) => (
  <div className="DesktopOnly">
    {children}
  </div>
);

export default compose(
  restrictDevice('DESKTOP')
)(DesktopOnly);
