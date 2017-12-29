import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withFretboard } from 'enhancers';

const enhance = compose(
  withFretboard,
  lifecycle({
    componentDidMount(): void {
      this.props.fretboard.state.instance.addMarker(this);
    },
    componentWillUnmount(): void {
      this.props.fretboard.state.instance.removeMarker(this);
    }
  })
);

const FretMarker = ({ string, fret }) => (
  <div className="FretMarker">
    {`${string},${fret}`}
  </div>
);

export default FretMarker;
