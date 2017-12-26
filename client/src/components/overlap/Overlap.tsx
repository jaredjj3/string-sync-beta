import * as React from 'react';
import { compose, setStatic, mapProps } from 'recompose';
import classNames from 'classnames';
import { omit } from 'lodash';
import Layer from './Layer';

const enhance = compose(
  setStatic('Layer', Layer),
  mapProps(props => {
    const restProps = omit(props, ['className']);
    const className = classNames(
      'Overlap',
      props.className
        ? props.className.split(/\s+/)
        : null
    );

    return { ...restProps, className };
  })
);

const Overlap = (props) => <div {...props} />;

export default enhance(Overlap);
