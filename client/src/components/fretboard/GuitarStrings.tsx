import * as React from 'react';
import { GuitarString } from './'

const GuitarStrings = () => (
  <div className="GuitarStrings">
    {
      Array(6).fill(null).map((_, string) => (
        <GuitarString
          key={`string-${string}`}
          string={string}
        />
      ))
    }
  </div>
);

export default GuitarStrings;
