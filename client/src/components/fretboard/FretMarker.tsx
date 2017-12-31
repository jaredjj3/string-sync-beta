import * as React from 'react';
import { compose, withState, lifecycle, withProps } from 'recompose';
import { withFretboard, withViewport } from 'enhancers';
import * as classNames from 'classnames';

const enhance = compose(
  withFretboard,
  withViewport,
  withState('lit', 'setLit', false),
  withState('pressed', 'setPressed', false),
  withProps(props => ({
    rootClassNames: classNames(
      'FretMarker',
      {
        'FretMarker--lit': props.lit && !props.pressed,
        'FretMarker--pressed': props.pressed,
        'FretMarker--hidden': !props.lit && !props.pressed,
        'FretMarker--mobile': props.viewport.state.type === 'MOBILE'
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.state.instance.addFretMarker(string, fret, this.props);
    },
    componentWillReceiveProps(nextProps: any): void {
      const { fretboard, string, fret } = nextProps;
      const fretboardService = fretboard.state.instance;
      const marker = fretboardService.selectFretMarker(string, fret);

      // Ensure that a marker is present on the latest fretboardService object.
      if (marker === null) {
        fretboardService.addFretMarker(string, fret, this.props);
      }
    },
    componentWillUnmount(): void {
      const { fretboard, string, fret } = this.props;
      fretboard.state.instance.removeFretMarker(string, fret);
    }
  })
);

const FretMarker = ({ rootClassNames }) => <div className={rootClassNames} />;

export default enhance(FretMarker);
