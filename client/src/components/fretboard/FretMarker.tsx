import * as React from 'react';
import { compose, toClass, lifecycle } from 'recompose';
import { withFretboard } from 'enhancers';

const enhance = compose(
  withFretboard,
  toClass,
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

const FretMarker = ({ string, fret }) => (
  <div className="FretMarker">
    {`${string},${fret}`}
  </div>
);

export default enhance(FretMarker);
