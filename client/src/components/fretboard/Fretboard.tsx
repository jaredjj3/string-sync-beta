import * as React from 'react';
import { compose } from 'recompose';
import { Row, Col } from 'antd';
import Frets from './Frets';
import Strings from './Strings';

const enhance = compose (

);

const FretboardIndicators = () => {
  const indicators = Frets.DOTS.map((dots, fret) => (
    dots > 0 || fret === 0 ? fret.toString() : null
  ));

  return (
    <Row className="Fret__indicator" type="flex" justify="center">
      {
        indicators.map((indicator, fret) => (
          <Col key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
            {indicator}
          </Col>
        ))
      }
    </Row>
  );
};

const Fretboard = () => (
  <div className="Fretboard">
    <FretboardIndicators />
    <Frets />
    <Strings />
  </div>
);

export default enhance(Fretboard);
