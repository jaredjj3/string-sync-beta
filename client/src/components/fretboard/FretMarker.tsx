import * as React from 'react';
import { compose, withState, shouldUpdate, lifecycle, withProps } from 'recompose';
import { withViewport } from 'enhancers';
import * as classNames from 'classnames';
import styled from 'styled-components';
import { isEqual } from 'lodash';

const enhance = compose(
  withViewport,
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withState('justPressed', 'setJustPressed', false),
  shouldUpdate((currProps, nextProps) => !isEqual(currProps, nextProps)),
  withProps(props => ({
    rootClassNames: classNames(
      'FretMarker',
      {
        'FretMarker--lit': props.lit && !props.pressed,
        'FretMarker--pressed': props.pressed,
        'FretMarker--hidden': !props.lit && !props.pressed,
        'FretMarker--justPressed': props.pressed && props.justPressed,
        'FretMarker--mobile': props.viewport.state.type === 'MOBILE',
      }
    )
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

const FretMarkerOuter = styled.div`
  .FretMarker {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 10px;
    margin: 3.5px 1px;
    background-color: #B3FB66;

    &.FretMarker--mobile {
      width: 12px;
      height: 12px;
      font-size: 0;
    }

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
  }
`;

const FretMarker = ({ rootClassNames }) => (
  <FretMarkerOuter>
    <div className={rootClassNames}></div>
  </FretMarkerOuter>
);

export default enhance(FretMarker);
