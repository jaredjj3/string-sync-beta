import React from 'react';

interface FretProps {}

interface FretState {}

class Fret extends React.Component<FretProps, FretState> {
  render(): JSX.Element {
    return (
      <div className="Fret">
        Fret
      </div>
    );
  }
}

export default Fret;
