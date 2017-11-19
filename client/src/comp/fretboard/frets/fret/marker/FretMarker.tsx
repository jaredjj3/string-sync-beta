import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Fretman, ScaleVisualizer, VexProvider } from 'services/vexflow';
import { isEqual } from 'lodash';
import { withDeviceType, withTab } from 'enhancers';
import classNames from 'classnames';

interface FretMarkerProps {
  string: number;
  fret: number;
  deviceType: string;
  provider: VexProvider;
  tuning: Array<string>;
  scaleVisualization: boolean;
}

interface FretMarkerState {
  lit: boolean;
  pressed: boolean;
}

class FretMarker extends React.Component<FretMarkerProps, FretMarkerState> {
  state: FretMarkerState = { lit: false, pressed: false };

  componentDidMount(): void {
    this.props.provider.fretman.addMarker(this);
  }

  shouldComponentUpdate(nextProps: FretMarkerProps, nextState: FretMarkerState): boolean {
    return (
      !isEqual(this.state, nextState) ||
      this.props.scaleVisualization !== nextProps.scaleVisualization ||
      this.props.deviceType !== nextProps.deviceType
    );
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

  handleMouseOver = (e: React.SyntheticEvent<any>): void => {
    this.press();

    if (this.props.scaleVisualization) {
      const { provider, string, fret } = this.props;
      const note = provider.scaleman.noteAt({ string, fret });

      try {
        provider.scaleman.light(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleMouseLeave = (e: React.SyntheticEvent<any>): void => {
    const { provider, string, fret } = this.props;
    const note = provider.scaleman.noteAt({ string, fret });

    const shouldUnpress = !provider.scaleman.pressedNotes.has(note);
    if (shouldUnpress) {
      this.unpress();
    }

    if (this.props.scaleVisualization) {
      try {
        provider.scaleman.unlight(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleClick = (e: React.SyntheticEvent<any>): void => {
    const { provider, string, fret } = this.props;

    if (this.props.scaleVisualization) {
      try {
        const note = provider.scaleman.noteAt({ string, fret });
        provider.scaleman.togglePress(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  render(): JSX.Element {
    const { string, fret, provider, deviceType } = this.props;
    const { lit, pressed } = this.state;
    const note = provider.scaleman.noteAt({ string, fret });

    const markerClassNames = classNames(
      'Marker',
      `Marker--string${string}`,
      {
        'Marker--hidden': !lit && !pressed,
        'Marker--lit': lit && !pressed,
        'Marker--pressed': pressed,
        'Marker--mobile': deviceType === 'MOBILE'
      }
    );

    return (
      <span
        className={markerClassNames}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        {note}
      </span>
    );
  }
}

const mapStateToProps = state => ({
  tuning: state.tab.tuning,
  scaleVisualization: state.feature.scaleVisualization,
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withDeviceType,
  withTab,
  connect(mapStateToProps, mapDispatchToProps)
)(FretMarker);
