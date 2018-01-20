import * as React from 'react';
import { compose, mapProps, withState, lifecycle, withProps } from 'recompose';
import { withFretboard, withViewport } from 'enhancers';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withFretboard,
  withViewport,
  mapProps(props => {
    const viewportType = props.viewport.state.type;
    const fretboard = props.fretboard.state.instance;

    return {
      fretboard,
      viewportType,
      string: props.string,
      fret: props.fret
    };
  }),
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withProps(props => ({
    rootClassNames: classNames(
      'FretMarker',
      {
        'FretMarker--lit': props.lit && !props.pressed,
        'FretMarker--pressed': props.pressed,
        'FretMarker--hidden': !props.lit && !props.pressed,
        'FretMarker--mobile': props.viewportType === 'MOBILE'
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.addFretMarker(string, fret, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { fretboard, string, fret } = nextProps;
      const marker = fretboard.selectFretMarker(string, fret);

      // Ensure that a marker is present on the latest fretboard object.
      if (marker === null) {
        fretboard.addFretMarker(string, fret, this.props);
      }
    },
    componentWillUnmount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.removeFretMarker(string, fret);
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
    margin: 3px 1px;
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
  }
`;

const FretMarker = ({ rootClassNames }) => (
  <FretMarkerOuter>
    <div className={rootClassNames}></div>
  </FretMarkerOuter>
);

export default enhance(FretMarker);
