import React from 'react';

import Marker from './marker';
import Col from 'antd/lib/col';

interface FretProps {
  fret: number;
  dots: number;
}

interface FretState {}

class Fret extends React.Component<FretProps, FretState> {
  render(): JSX.Element {
    const { fret, dots } = this.props;

    return (
      <div className="Fret">
        {
          Array(6).fill(null).map((_, string) => (
            <Marker
              key={`marker-${string}-${fret}`}
              string={string}
              fret={fret}
            />
          ))
        }
      </div>
    );
  }
}

export default Fret;
