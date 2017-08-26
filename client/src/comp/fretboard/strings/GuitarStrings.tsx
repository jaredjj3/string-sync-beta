import React from 'react';

import GuitarString from './string';

interface GuitarStringsProps {}

interface GuitarStringsState {}

class GuitarStrings extends React.PureComponent<GuitarStringsProps, GuitarStringsState> {
  render(): JSX.Element {
    return (
      <div className="GuitarStrings">
        {
          Array(6).fill(null).map((_, string) => (
            <GuitarString
              key={`string-${string}`}
              string={string + 1}
            />
          ))
        }
      </div>
    );
  }
}

export default GuitarStrings;
