import React from 'react';
import { compose } from 'recompose';
import { isEqual } from 'lodash';
import { withTab, withViewport, withFeatures } from 'enhancers';
import classNames from 'classnames';
import { Tab, Viewport, Features } from 'types';

interface FretMarkerProps {
  string: number;
  fret: number;
  tab: Tab;
  viewport: Viewport;
  features: Features;
}

interface FretMarkerState {
  lit: boolean;
  pressed: boolean;
}

class FretMarker extends React.Component<FretMarkerProps, FretMarkerState> {
  state: FretMarkerState = { lit: false, pressed: false };

  componentDidMount(): void {
    this.props.tab.provider.addMarker(this);
  }

  componentWillUnmount(): void {
    this.props.tab.provider.removeMarker(this);
  }

  shouldComponentUpdate(nextProps: FretMarkerProps, nextState: FretMarkerState): boolean {
    return (
      !isEqual(this.state, nextState) ||
      this.props.features.scaleVisualization !== nextProps.features.scaleVisualization ||
      this.props.viewport.type !== nextProps.viewport.type
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

    if (this.props.features.scaleVisualization) {
      const { tab, string, fret } = this.props;
      const note = tab.provider.scaleman.noteAt({ string, fret });

      try {
        tab.provider.scaleman.light(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleMouseLeave = (e: React.SyntheticEvent<any>): void => {
    const { tab, string, fret } = this.props;
    const note = tab.provider.scaleman.noteAt({ string, fret });

    const shouldUnpress = !tab.provider.scaleman.pressedNotes.has(note);
    if (shouldUnpress) {
      this.unpress();
    }

    if (this.props.features.scaleVisualization) {
      try {
        tab.provider.scaleman.unlight(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  handleClick = (e: React.SyntheticEvent<any>): void => {
    const { tab, string, fret } = this.props;

    if (this.props.features.scaleVisualization) {
      try {
        const note = tab.provider.scaleman.noteAt({ string, fret });
        tab.provider.scaleman.togglePress(note);
      } catch (e) {
        console.error(e);
      }
    }
  }

  render(): JSX.Element {
    const { string, fret } = this.props;
    const viewportType = this.props.viewport.type;
    const { provider } = this.props.tab;
    const { lit, pressed } = this.state;
    const note = provider.scaleman.noteAt({ string, fret });

    const markerClassNames = classNames(
      'Marker',
      `Marker--string${string}`,
      {
        'Marker--hidden': !lit && !pressed,
        'Marker--lit': lit && !pressed,
        'Marker--pressed': pressed,
        'Marker--mobile': viewportType === 'MOBILE'
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

const enhance = compose(
  withViewport,
  withTab,
  withFeatures
);

export default enhance(FretMarker);
