import * as React from 'react';
import { compose, setStatic } from 'recompose';
import Layer from './Layer';
import { withClassNames } from 'enhancers';

const enhance = compose(
  setStatic('Layer', Layer),
  withClassNames(['Overlap'])
);

const Overlap = (props) => <div {...props} />;

export default enhance(Overlap);
