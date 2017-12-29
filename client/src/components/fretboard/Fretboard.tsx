import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Row, Col } from 'antd';
import Frets from './Frets';
import Strings from './Strings';
import { withFretboard } from 'enhancers';
import { Fretboard as FretboardService } from 'services';
import { Overlap } from 'components';

const { Layer } = Overlap;

const enhance = compose(
  withFretboard,
  lifecycle({
    componentDidMount(): void {
      this.props.fretboard.dispatch.setFretboard(new FretboardService());
    },
    componentWillUnmount(): void {
      this.props.fretboard.dispatch.resetFretboard();
    }
  })
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
    <Overlap>
      <Layer>
        <Frets />
      </Layer>
      <Layer>
        <Strings />
      </Layer>
    </Overlap>
  </div>
);

export default enhance(Fretboard);
