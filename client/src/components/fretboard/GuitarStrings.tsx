import * as React from 'react';
import { GuitarString } from './'
import styled from 'styled-components';

const Outer = styled.div`
`;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
`;

const GuitarStrings = () => (
  <Outer>
    <Inner className="GuitarStrings">
      {
        Array(6).fill(null).map((_, string) => (
          <GuitarString
            key={`string-${string}`}
            string={string}
          />
        ))
      }
    </Inner>
  </Outer>
);

export default GuitarStrings;
