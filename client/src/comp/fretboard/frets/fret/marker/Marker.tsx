import React from 'react';

interface MarkerProps {}

interface MarkerState {}

class Marker extends React.Component<MarkerProps, MarkerState> {
  render(): JSX.Element {
    return (
      <div className="Marker">
        Marker
      </div>
    );
  }
}

export default Marker;
