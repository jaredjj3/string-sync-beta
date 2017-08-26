import React from 'react';

import Frets from './frets';
import Strings from './strings';

interface FretboardProps {}

interface FretboardState {}

class Fretboard extends React.PureComponent<FretboardProps, FretboardState> {
  render(): JSX.Element {
    return (
      <div className="FretboardContainer">
        <div className="Fretboard">
          <Frets />
          <Strings />
        </div>
      </div>
    );
  }
}

export default Fretboard;
