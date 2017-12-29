import { mapProps } from 'recompose';
import { omit } from 'lodash';
import * as classNames from 'classnames';

const withClassNames = (classNameArray: Array<string>) => mapProps(props => {
  const restProps = omit(props, ['className']);
  const className = classNames(
    classNameArray,
    props.className ? props.className.split(/\s+/) : null
  );

  return { ...restProps, className };
});

export default withClassNames;
