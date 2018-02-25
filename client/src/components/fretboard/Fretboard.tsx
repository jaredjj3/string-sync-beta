import * as React from 'react';
import { compose, withState, withProps, branch, renderNothing } from 'recompose';
import { Row, Col } from 'antd';
import { FretboardController, Frets, GuitarStrings } from './';
import { withViewport, hasGlobalProps, identity } from 'enhancers';
import { Overlap, Layer } from 'components';
import * as classNames from 'classnames';
import styled from 'styled-components';

const enhance = compose(
  withViewport,
  withState('isVisible', 'setVisibility', true),
  withProps(props => ({
    rootClassNames: classNames(
      'Fretboard',
      {
        'Fretboard--mobile': props.viewport.state.type === 'MOBILE',
        'Fretboard--desktop': props.viewport.state.type === 'DESKTOP'
      }
    )
  })),
  hasGlobalProps('fretboard', () => window.ss.globalProps),
  branch(
    props => props.isVisible,
    identity,
    renderNothing
  ),
);

const FretboardOuter = styled.div`
  background: black;
  color: white;
  z-index: 9999;

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

  width: 100%;
`;

const FretboardIndicators = () => {
  const indicators = Frets.DOTS.map((dots, fret) => (
    dots > 0 || fret === 0 ? fret.toString() : null
  ));

  return (
    <Row type="flex" justify="center">
      {
        indicators.map((indicator, fret) => (
          <Col className="Fret__indicator" key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
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
