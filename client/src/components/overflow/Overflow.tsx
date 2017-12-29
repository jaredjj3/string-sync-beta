import * as React from 'react';
import * as classNames from 'classnames';
import { compose } from 'recompose';
import { withClassNames } from 'enhancers';

const enhance = compose(
  withClassNames(['Overflow'])
);

const Overflow = (props) => <div {...props} />;

export default Overflow;
