import * as React from 'react';
import { compose, lifecycle, withProps, shouldUpdate } from 'recompose';
import { Row, Col } from 'antd';
import Frets from './Frets';
import Strings from './Strings';
import { withFretboard, withViewport } from 'enhancers';
import { Fretboard as FretboardService } from 'services';
import { Overlap } from 'components';
import * as classNames from 'classnames';

const { Layer } = Overlap;

const enhance = compose(
  withFretboard,
  withViewport,
  shouldUpdate((currProps, nextProps) => (
    currProps.viewport.state.type !== nextProps.viewport.state.type
  )),
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewport.state.type === 'MOBILE',
        'Fretboard--desktop': props.viewport.state.type === 'DESKTOP'
      }
    )
  })),
  lifecycle({
    componentDidMount(): void {
      this.props.fretboard.dispatch.resetFretboard();
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
            <Row type="flex" justify="center">
              {indicator}
            </Row>
          </Col>
        ))
      }
    </Row>
  );
};

const Fretboard = ({ rootClassNames }) => (
  <div className={rootClassNames}>
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
