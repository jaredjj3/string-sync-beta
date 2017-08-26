import React from 'react';

import Frets from './frets';
import Strings from './strings';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface FretboardProps {}

interface FretboardState {}

class Fretboard extends React.PureComponent<FretboardProps, FretboardState> {
  render(): JSX.Element {
    return (
      <div className="FretboardContainer">
        <Row type="flex" justify="center" className="Fret__indicator">
          {
            Array(23).fill(null).map((_, fret) => (
              <Col key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
                <Row type="flex" justify="center">
                  {fret}
                </Row>
              </Col>
            ))
          }
        </Row>
        <div className="Fretboard">
          <Frets />
          <Strings />
        </div>
      </div>
    );
  }
}

export default Fretboard;
