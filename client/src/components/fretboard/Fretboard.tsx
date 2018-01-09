import * as React from 'react';
import { compose, mapProps, withProps, shouldUpdate } from 'recompose';
import { Row, Col } from 'antd';
import { FretboardAdapter, Frets, GuitarStrings } from './';
import { withViewport, withFretboard } from 'enhancers';
import { Overlap, Layer } from 'components';
import * as classNames from 'classnames';

const enhance = compose(
  withViewport,
  withFretboard,
  mapProps(props => {
    const viewportType = props.viewport.state.type;
    const fretboard = props.fretboard.state.instance;

    return {
      viewportType,
      fretboard
    }
  }),
  shouldUpdate((currProps, nextProps) => (
    currProps.viewportType !== nextProps.viewportType ||
    currProps.fretboard !== nextProps.fretboard
  )),
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewportType === 'MOBILE',
        'Fretboard--desktop': props.viewportType === 'DESKTOP'
      }
    )
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

const Fretboard = ({ rootClassNames, fretboard }) => (
  <div className={rootClassNames}>
    <FretboardAdapter />
    {
      fretboard
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
