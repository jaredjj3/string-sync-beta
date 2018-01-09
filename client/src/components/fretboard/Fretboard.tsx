import * as React from 'react';
import { compose, withProps, shouldUpdate } from 'recompose';
import { Row, Col } from 'antd';
import { FretboardAdapter, Frets, GuitarStrings } from './';
import { withViewport, withFretboard } from 'enhancers';
import { Overlap, Layer } from 'components';
import * as classNames from 'classnames';

const enhance = compose(
  withViewport,
  withFretboard,
  shouldUpdate((currProps, nextProps) => (
    currProps.viewport.state.type !== nextProps.viewport.state.type ||
    currProps.fretboard.state.instance !== nextProps.fretboard.state.instance
  )),
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewport.state.type === 'MOBILE',
        'Fretboard--desktop': props.viewport.state.type === 'DESKTOP'
      }
    ),
    shouldRenderFretboard: !!props.fretboard.state.instance
  }))
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

const Fretboard = ({ rootClassNames, shouldRenderFretboard }) => (
  <div className={rootClassNames}>
    <FretboardAdapter />
    {
      shouldRenderFretboard
        ? <div className="Fretboard__afterFretboardServiceMount">
            <FretboardIndicators />
            <Overlap>
              <Layer>
                <Frets />
              </Layer>
              <Layer>
                <GuitarStrings />
              </Layer>
            </Overlap>
          </div>
        : null
    }
  </div>
);

export default enhance(Fretboard);
