import React from 'react';
import { withRouter } from 'react-router';
import { lifecycle, compose } from 'recompose';

import Library from 'root/routes/library';

const MobileLanding = () => <Library />;

export default compose(
  withRouter
)(MobileLanding);
