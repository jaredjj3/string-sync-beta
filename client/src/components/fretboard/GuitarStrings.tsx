import * as React from 'react';
import { GuitarString } from './'
import styled from 'styled-components';

const Outer = (styled.div as any)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
  height: ${props => props.height}px;
  width: 100%;
`;

const GuitarStrings = ({ height, type }) => (
  <Outer height={height}>
    {
      Array(6).fill(null).map((_, string) => (
        <GuitarString
          key={`string-${string}`}
          string={string}
          type={type}
        />
      ))
    }
  </Outer>
);

export default GuitarStrings;
