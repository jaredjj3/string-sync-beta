import React from 'react';

import Marker from './marker';
import Row from 'antd/lib/row';
import Dot from './dot';

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
        <div className="Fret__markers">
          {
            Array(6).fill(null).map((_, string) => (
              <Row type="flex" justify="center" key={`marker-${string + 1}-${fret}`}>
                <Marker
                  string={string + 1}
                  fret={fret}
                />
              </Row>
            ))
          }
        </div>
        <div className="Fret__dots">
          {
            Array(dots).fill(null).map((_, index) => <Dot key={`marker-dot-${index}`} />)
          }
        </div>
      </div>
    );
  }
}

export default Fret;
