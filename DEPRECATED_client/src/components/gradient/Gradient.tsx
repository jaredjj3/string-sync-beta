import React from 'react';

import './_gradient.less';
import { compose, branch, renderNothing } from 'recompose';
import { identity, withFeatures } from 'enhancers';

const Gradient = (): JSX.Element => <div className="Gradient" />;

const enhance = compose(
  withFeatures,
  branch(
    ({ features }) => features.gradient,
    identity,
    renderNothing
  )
);

export default enhance(Gradient);
