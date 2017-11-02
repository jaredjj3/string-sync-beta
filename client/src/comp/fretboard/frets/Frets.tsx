import React from 'react';

import Fret from './fret';
import { Row, Col } from 'antd';

import { withDeviceType } from 'enhancers';

interface FretsProps {
  deviceType?: string;
}

interface FretsState {}

class Frets extends React.PureComponent<FretsProps, FretsState> {
  static DOTS: Array<number> = [
    0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    2, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0
  ];

  static DESKTOP_DOTS: Array<number> = Frets.DOTS.slice();

  static MOBILE_DOTS: Array<number> = Frets.DOTS.slice(0, 16);

  render(): JSX.Element {
    // const fretsDots = this.props.deviceType === 'DESKTOP' ? Frets.DESKTOP_DOTS : Frets.MOBILE_DOTS;
    const fretsDots = Frets.DOTS;

    return (
      <div className="Frets">
        <Row type="flex">
          {
            fretsDots.map((dots, fret) => (
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

export default withDeviceType(Frets);
