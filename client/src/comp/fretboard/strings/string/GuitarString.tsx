import React from 'react';

interface GuitarStringProps {}

interface GuitarStringState {}

class GuitarString extends React.Component<GuitarStringProps, GuitarStringState> {
  render(): JSX.Element {
    return (
      <div className="GuitarString">
        GuitarString
      </div>
    );
  }
}

export default GuitarString;
