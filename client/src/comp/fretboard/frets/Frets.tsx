import React from 'react';

import Fret from './fret';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

interface FretsProps {}

interface FretsState {}

class Frets extends React.PureComponent<FretsProps, FretsState> {
  static DOTS: Array<number> = [
    0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0
  ];

  render(): JSX.Element {
    return (
      <div className="Frets">
        <Row type="flex">
          {
            Frets.DOTS.map((dots, fret) => (
              <Col
                span={fret === 0 ? 2 : 1}
                key={`fret-${fret}`}
              >
                <Fret
                  fret={fret}
                  dots={dots}
                />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

export default Frets;
