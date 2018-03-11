import * as React from 'react';
import { compose, withState, shouldUpdate, lifecycle, withProps } from 'recompose';
import { withViewport } from 'enhancers';
import * as classNames from 'classnames';
import styled from 'styled-components';
import { isEqual } from 'lodash';

const enhance = compose(
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withState('justPressed', 'setJustPressed', false),
  withState('suggested', 'setSuggested', false),
  shouldUpdate((currProps, nextProps) => !isEqual(currProps, nextProps)),
  withProps(props => ({
    rootClassNames: classNames(
      'FretMarker',
      {
        'FretMarker--lit': props.lit && !props.pressed,
        'FretMarker--pressed': props.pressed,
        'FretMarker--hidden': !props.lit && !props.pressed && !props.suggested,
        'FretMarker--justPressed': props.pressed && props.justPressed,
        'FretMarker--suggested': !props.pressed && !props.justPressed && !props.lit && props.suggested
      }
    )
  })),
  withProps(props => ({
    note: window.ss.maestro.tuning.getNote({ fret: props.fret, str: props.str }).slice(0, -2)
  })),
  lifecycle({
    componentDidMount(): void {
      const { str, fret } = this.props;
      window.ss.maestro.fretboard.addFretMarker(str, fret, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { str, fret } = nextProps;
      const { fretboard } = window.ss.maestro;
      const marker = fretboard.selectFretMarker(str, fret);

      // Ensure that a marker is present on the latest fretboard object.
      if (marker === null) {
        fretboard.addFretMarker(str, fret, this.props);
      }
    },
    componentWillUnmount(): void {
      const { str, fret } = this.props;
      window.ss.maestro.fretboard.removeFretMarker(str, fret);
    }
  })
);

const FretMarker = ({ note, type, rootClassNames }) => (
  <Outer type={type}>
    <div className={rootClassNames}>{note}</div>
  </Outer>
);

const Outer = (styled.div as any) `
  .FretMarker {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: ${props => props.type === 'MOBILE' ? 13 : 24}px;
    height: ${props => props.type === 'MOBILE' ? 13 : 24}px;
    margin-top: -2px;
    font-size: ${props => props.type === 'MOBILE' ? 6 : 8}px;
    background-color: #B3FB66;

    &.FretMarker--pressed {
      background-color: #B3FB66;
      opacity: 1;
    }

    &.FretMarker--lit {
      background-color: rgb(251, 246, 102);
      opacity: 0.25;
      box-shadow: 0 0 2px 1px rgb(251, 246, 102);
    }

    &.FretMarker--hidden {
      opacity: 0;
      transition: all 200ms ease-in;
    }

    &.FretMarker--justPressed {
      border: 2px solid rgba(0, 0, 0, 0.75);
    }

    &.FretMarker--suggested {
      background-color: fuchsia;
      opacity: 0.5;
    }
  }
`;

export default enhance(FretMarker);
