import * as React from 'react';
import { Row, Col } from 'antd';
import { Overlap } from 'components';
import FretMarker from './FretMarker';

const { Layer } = Overlap;

const Fret = ({ fret, dots }) => (
  <Overlap className="Fret">
    <Layer className="Fret__markers" style={{ zIndex: '10' }}>
      {
        Array(6).fill(null).map((_, string) => (
          <Row type="flex" justify="center" key={`marker-${string + 1}-${fret}`}>
            <FretMarker string={string + 1} fret={fret} />
          </Row>
        ))
      }
    </Layer>
    <Layer className="Fret__dots" style={{ zIndex: '9' }}>
      {
        Array(dots).fill(null).map((_, index) => (
          <span className="FretDot" key={`marker-dot-${index}`} />
        ))
      }
    </Layer>
  </Overlap>
);

export default Fret;
