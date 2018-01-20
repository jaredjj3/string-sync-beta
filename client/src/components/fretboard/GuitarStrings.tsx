import * as React from 'react';
import { GuitarString } from './'
import styled from 'styled-components';

const GuitarStringsWrapper = styled.div`
  .GuitarStrings {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const GuitarStringsWrapped = styled.div``;

const GuitarStrings = () => (
  <GuitarStringsWrapper>
    <GuitarStringsWrapped className="GuitarStrings">
      {
        Array(6).fill(null).map((_, string) => (
          <GuitarString
            key={`string-${string}`}
            string={string}
          />
        ))
      }
    </GuitarStringsWrapped>
  </GuitarStringsWrapper>
);

export default GuitarStrings;
