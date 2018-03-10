import * as React from 'react';
import { Row, Col } from 'antd';
import { Overlap, Layer } from 'components';
import { FretMarker } from './';
import styled from 'styled-components';

const Outer = (styled.div as any)`
  height: ${props => props.height}px;
  border-right: ${props => props.fret === 0 ? 6 : props.type === 'MOBILE' ? 1 : 2}px solid #aaa;
  box-shadow: 1px 0 1px 1px #222;
  width: 100%;
`;
const FretMarkerContainer = (styled.div as any)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  height: ${props => props.height}px;
`;
const FretDotsContainer = (styled.div as any)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: ${props => props.height}px;
`;
const FretDot = (styled.div as any)`
  width: ${props => props.type === 'MOBILE' ? 12 : 18}px;
  height: ${props => props.type === 'MOBILE' ? 12 : 18}px;
  background-color: #6e6e6e;
  border-radius: 50%;
  opacity: 0.4;
`;

const Fret = ({ fret, dots, height, type }) => (
  <Outer fret={fret} height={height} type={type}>
    <Overlap>
      <Layer className="Fret__fretMarkers" style={{ zIndex: '10' }}>
        <FretMarkerContainer height={height}>
          {
            Array(6).fill(null).map((_, str) => (
              <FretMarker str={str} fret={fret} type={type} key={`marker-${str}-${fret}`} />
            ))
          }
        </FretMarkerContainer>
      </Layer>
      <Layer className="Fret__fretDots" style={{ zIndex: '9' }}>
        <FretDotsContainer height={height}>
          {
            Array(dots).fill(null).map((_, index) => (
              <FretDot type={type} key={`marker-dot-${index}`} />
            ))
          }
        </FretDotsContainer>
      </Layer>
    </Overlap>
  </Outer>
);

export default Fret;
