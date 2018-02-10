import * as React from 'react';
import { compose, branch, renderComponent, withState, shouldUpdate, withProps, lifecycle } from 'recompose';
import { BlackPianoKey, WhitePianoKey } from './';
import { isEqual } from 'lodash';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withState('justPressed', 'setJustPressed', false),
  shouldUpdate((currProps, nextProps) => !isEqual(currProps, nextProps)),
  withProps(props => ({
    rootClassNames: classNames(
      'PianoKey',
      {
        'PianoKey--lit': props.lit && !props.pressed,
        'PianoKey--pressed': props.pressed,
        'PianoKey--hidden': !props.lit && !props.pressed,
        'PianoKey--justPressed': props.pressed && props.justPressed,
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      
    }
  }),
  branch(
    props => props.note.includes('#'),
    renderComponent(
      props => (
        <BlackPianoKey
          note={props.note}
          rootClassNames={props.rootClassNames}
        />)
    ),
    renderComponent(
      props => (
        <WhitePianoKey
          note={props.note}
          rootClassNames={props.rootClassNames}
        />)
    ),
  )
);

const PianoKey = () => null;

export default enhance(PianoKey);
