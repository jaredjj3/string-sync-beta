import * as React from 'react';
import { compose, withProps, mapProps, shouldUpdate } from 'recompose';
import { Row, Col } from 'antd';
import { FretboardController, Frets, GuitarStrings } from './';
import { withViewport } from 'enhancers';
import { Overlap, Layer } from 'components';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withViewport,
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewport.state.type === 'MOBILE',
        'Fretboard--desktop': props.viewport.state.type === 'DESKTOP'
      }
    )
  }))
);

const FretboardOuter = styled.div`
  background: black;
  color: white;

  &&& .ant-col-2 .Fret:first-child {
    border-right: 3px solid rgba(211, 211, 211, 0.2);
  }

  .Fretboard--desktop {
    height: 185px;

    .Fret, .GuitarStrings {
      height: 164px;
    }
  }

  .Fretboard--mobile {
    height: 135px;
  
    .Fret, .GuitarStrings {
      height: 114px;
    }
  }
`;
const FretboardInner = styled.div`
  .Fret__indicator {
    background: black;
  }
`;

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
  <FretboardOuter>
    <FretboardInner className={rootClassNames}>
      <FretboardController />
      <FretboardIndicators />
      <Overlap>
        <Layer>
          <Frets />
        </Layer>
        <Layer>
          <GuitarStrings />
        </Layer>
      </Overlap>
    </FretboardInner>
  </FretboardOuter>
);

export default enhance(Fretboard);
