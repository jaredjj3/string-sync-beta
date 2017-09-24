import React from 'react';
import { connect } from 'react-redux';

import { Fretman, ScaleVisualizer } from 'services/vexflow';
import { isEqual } from 'lodash';

interface FretMarkerProps {
  string: number;
  fret: number;
  fretman: Fretman;
  scaleVisualizer: ScaleVisualizer;
  tuning: Array<string>;
}

interface FretMarkerState {
  lit: boolean;
  pressed: boolean;
}

class FretMarker extends React.PureComponent<FretMarkerProps, FretMarkerState> {
  state: FretMarkerState = { lit: false, pressed: false };

  componentDidMount(): void {
    this.props.fretman.addMarker(this);
  }

  shouldComponentUpdate(nextProps: FretMarkerProps, nextState: FretMarkerState): boolean {
    return (
      !isEqual(this.state, nextState) ||
      !isEqual(this.props.tuning, nextProps.tuning)
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

    const { scaleVisualizer, string, fret } = this.props;
    const note = scaleVisualizer.noteAt({ string, fret });

    // try {
    //   scaleVisualizer.light(note);
    // } catch (e) { }
  }

  handleMouseLeave = (e: React.SyntheticEvent<any>): void => {
    const { scaleVisualizer, string, fret } = this.props;
    const note = scaleVisualizer.noteAt({ string, fret });

    const shouldUnpress = !scaleVisualizer.pressedNotes.has(note);
    if (shouldUnpress) {
      this.unpress();
    }

    // try {
    //   scaleVisualizer.unlight(note);
    // } catch (e) { }
  }

  handleClick = (e: React.SyntheticEvent<any>): void => {
    const { scaleVisualizer, string, fret } = this.props;
    const note = scaleVisualizer.noteAt({ string, fret });

    try {
      scaleVisualizer.togglePress(note);
    } catch (e) { }
  }

  render(): JSX.Element {
    const { string, fret, scaleVisualizer } = this.props;
    const { lit, pressed } = this.state;
    const note = scaleVisualizer.noteAt({ string, fret });

    const markerClassName = [
      'Marker',
      `Marker--string${string}`,
      !lit && !pressed ? 'Marker--hidden' : '',
      lit  && !pressed ? 'Marker--lit' : '',
      pressed          ? 'Marker--pressed' : ''
    ].join(' ').trim();

    return (
      <span
        className={markerClassName}
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
  tuning: state.tab.tuning
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FretMarker);
