import React from 'react';

import { isEqual } from 'lodash';

interface FretMarkerProps {
  string: number;
  fret: number;
}

interface FretMarkerState {
  lit: boolean;
  pressed: boolean;
}

class FretMarker extends React.PureComponent<FretMarkerProps, FretMarkerState> {
  state: FretMarkerState = {
    lit: Math.random() > 0.5,
    pressed: Math.random() > 0.5
  };

  shouldComponentUpdate(nextProps: FretMarkerProps, nextState: FretMarkerState): boolean {
    return !isEqual(this.state, nextState);
  }

  light = (e?: React.SyntheticEvent<any>): void => {
    if (!this.state.lit) {
      this.setState(Object.assign({}, this.state, { lit: true }));
    }
  }

  unlight = (e?: React.SyntheticEvent<any>): void => {
    if (this.state.lit) {
      this.setState(Object.assign({}, this.state, { lit: false }));
    }
  }

  press = (e?: React.SyntheticEvent<any>): void => {
    if (!this.state.pressed) {
      this.setState(Object.assign({}, this.state, { pressed: true }));
    }
  }

  unpress = (e?: React.SyntheticEvent<any>): void => {
    if (this.state.pressed) {
      this.setState(Object.assign({}, this.state, { pressed: false }));
    }
  }

  render(): JSX.Element {
    const { string, fret } = this.props;
    const { lit, pressed } = this.state;

    const markerClassName = [
      'Marker',
      `Marker--string${string}`,
      lit     ? 'Marker--lit' : 'Marker--hidden',
      pressed ? 'Marker--pressed' : ''
    ].join(' ').trim();

    return (
      <span
        className={markerClassName}
        onMouseOver={this.press}
        onMouseLeave={this.unpress}
      >
        &nbsp;
      </span>
    );
  }
}

export default FretMarker;
