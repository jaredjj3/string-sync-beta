import React from 'react';

interface FretboardProps {}

interface FretboardState {}

class Fretboard extends React.Component<FretboardProps, FretboardState> {
  render(): JSX.Element {
    return (
      <div className="Fretboard">
        Fretboard
      </div>
    );
  }
}

export default Fretboard;
