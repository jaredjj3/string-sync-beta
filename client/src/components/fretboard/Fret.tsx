import * as React from 'react';
import { Row, Col } from 'antd';
import { Overlap, Layer } from 'components';
import { FretMarker } from './';
import styled from 'styled-components';

const FretOuter = styled.div`
  .Fret {
    background: black;
    border-right: 1px solid rgba(211, 211, 211, 0.2);
  }

  .Fret__fretMarkers {
    width: 100%;
  }

  .Fret__fretDots {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    height: 100%;
    width: calc(100% - 4px);
    top: 0;
  }

  .FretDot {
    display: block;
    width: 8px;
    height: 8px;
    background-color: rgba(211, 211, 211, 0.65);;
    border-radius: 50%;
    opacity: 0.5;
  }
`;

const Fret = ({ fret, dots }) => (
  <FretOuter>
    <Overlap className="Fret">
      <Layer className="Fret__fretMarkers" style={{ zIndex: '10' }}>
        {
          Array(6).fill(null).map((_, str) => (
            <Row type="flex" justify="center" key={`marker-${str}-${fret}`}>
              <FretMarker str={str} fret={fret} />
            </Row>
          ))
        }
      </Layer>
      <Layer className="Fret__fretDots" style={{ zIndex: '9' }}>
        {
          Array(dots).fill(null).map((_, index) => (
            <span className="FretDot" key={`marker-dot-${index}`} />
          ))
        }
      </Layer>
    </Overlap>
  </FretOuter>
);

export default Fret;
