import React from 'react';

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
    lit: true,
    pressed: true
  };

  componentWillMount(): void {
    // fretman.addMarker(this)
  }

  light = (e?: React.SyntheticEvent<any>): void => {
    console.log('lit');
  }

  hide = (e?: React.SyntheticEvent<any>): void => {
    console.log('hidden');
  }

  press = (e?: React.SyntheticEvent<any>): void => {
    console.log('pressed');
  }

  depress = (e?: React.SyntheticEvent<any>): void => {
    console.log('depressed');
  }

  render(): JSX.Element {
    const { string, fret } = this.props;
    const { lit, pressed } = this.state;

    const markerClassName = [
      'Marker',
      `Marker--string${string}`,
      lit     ? 'Marker--lit' : '',
      pressed ? 'Marker--pressed' : ''
    ].join(' ').trim();

    return (
      <span
        className={markerClassName}
        onMouseOver={this.light}
        onMouseLeave={this.hide}
      >
        &nbsp;
      </span>
    );
  }
}

export default FretMarker;
