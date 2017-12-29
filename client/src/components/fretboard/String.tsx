import * as React from 'react';
import { compose, withState, withProps } from 'recompose';
import { withFretboard } from 'enhancers';
import * as classNames from 'classnames';

const enhance = compose(
  withFretboard,
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withProps(props => ({
    rootClassNames: classNames(
      'String',
      {
        'String--lit': props.lit,
        'String--pressed': props.pressed,
        'String--thin': props.string <= 3,
        'String--thick': props.string > 3
      }
    )
  }))
);

const String = ({ rootClassNames }) => <div className={rootClassNames} />;

export default enhance(String);
