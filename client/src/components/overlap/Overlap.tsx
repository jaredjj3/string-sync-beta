import * as React from 'react';
import { compose } from 'recompose';
import { withClassNames } from 'enhancers';

const enhance = compose(
  withClassNames(['Overlap'])
);

const Overlap = (props) => <div {...props} />;

export default enhance(Overlap);
