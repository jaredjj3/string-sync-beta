import * as React from 'react';
import { compose, mapProps, withState, lifecycle, withProps } from 'recompose';
import { withFretboard, withViewport } from 'enhancers';
import * as classNames from 'classnames';

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

const FretMarker = ({ rootClassNames }) => <div className={rootClassNames} />;

export default enhance(FretMarker);
