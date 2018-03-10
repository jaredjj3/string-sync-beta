import * as React from 'react';
import { Frets, SuggestedNoteDescription } from './';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { isBetween } from 'ssUtil';

const Outer = styled.div`
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
  color: darkgray;
`;
const Indicator = styled(Col)`
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FretIndicators = () => (
  <Outer>
    <Row type="flex" justify="center">
      {
        Frets.DOTS.map((dots, fret) => dots > 0 ? fret.toString() : null).map((indicator, fret) => (
          isBetween(fret, 1, 2)
            ? null
            : <Indicator key={`fret-indicator-${fret}`} span={fret === 0 ? 4 : 1}>
                {fret === 0 ? <SuggestedNoteDescription /> : indicator}
              </Indicator>
        ))
      }
    </Row>
  </Outer>
);

export default FretIndicators;
