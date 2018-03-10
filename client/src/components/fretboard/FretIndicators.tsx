import * as React from 'react';
import { Frets } from './';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Outer = styled.div`
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  color: darkgray;
`;
const Indicator = styled(Col)`
  text-align: center;
  font-size: 9px;
`;

const FretIndicators = () => {
  const indicators = Frets.DOTS.map((dots, fret) => (
    dots > 0 || fret === 0 ? fret.toString() : null
  ));

  return (
    <Outer>
      <Row type="flex" justify="center">
        {
          indicators.map((indicator, fret) => (
            <Indicator key={`fret-indicator-${fret}`} span={fret === 0 ? 2 : 1}>
              {indicator}
            </Indicator>
          ))
        }
      </Row>
    </Outer>
  );
};

export default FretIndicators;
