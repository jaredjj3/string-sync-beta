import * as React from 'react';
import { compose, mapProps } from 'recompose';
import * as classNames from 'classnames';
import { omit } from 'lodash';

const enhance = compose(
  mapProps(props => {
    const restProps = omit(props, ['className']);
    const className = classNames(
      'Layer',
      props.className
        ? props.className.split(/\s+/)
        : null
    );

    return { ...restProps, className };
  })
);

const Layer = (props) => <div {...props} />;

export default enhance(Layer);
