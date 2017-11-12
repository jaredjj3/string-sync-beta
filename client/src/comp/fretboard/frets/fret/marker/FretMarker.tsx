import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { Fretman, ScaleVisualizer } from 'services/vexflow';
import { isEqual } from 'lodash';
import { withDeviceType } from 'enhancers';
import classNames from 'classnames';

interface FretMarkerProps {
  string: number;
  fret: number;
  fretman: Fretman;
  deviceType: string;
  scaleVisualizer: ScaleVisualizer;
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
    this.props.fretman.addMarker(this);
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
      const { scaleVisualizer, string, fret } = this.props;
      const note = scaleVisualizer.noteAt({ string, fret });

      try {
        scaleVisualizer.light(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleMouseLeave = (e: React.SyntheticEvent<any>): void => {
    const { scaleVisualizer, string, fret } = this.props;
    const note = scaleVisualizer.noteAt({ string, fret });

    const shouldUnpress = !scaleVisualizer.pressedNotes.has(note);
    if (shouldUnpress) {
      this.unpress();
    }

    if (this.props.scaleVisualization) {
      try {
        scaleVisualizer.unlight(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleClick = (e: React.SyntheticEvent<any>): void => {
    const { scaleVisualizer, string, fret } = this.props;
    const note = scaleVisualizer.noteAt({ string, fret });

    if (this.props.scaleVisualization) {
      try {
        scaleVisualizer.togglePress(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  render(): JSX.Element {
    const { string, fret, scaleVisualizer, deviceType } = this.props;
    const { lit, pressed } = this.state;
    const note = scaleVisualizer.noteAt({ string, fret });

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
  fretman: state.tab.fretman,
  scaleVisualizer: state.tab.scaleVisualizer,
  tuning: state.tab.tuning,
  scaleVisualization: state.feature.scaleVisualization,
});

const mapDispatchToProps = dispatch => ({

});

export default compose(
  withDeviceType,
  connect(mapStateToProps, mapDispatchToProps)
)(FretMarker);
