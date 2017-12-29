import * as React from 'react';
import String from './String';

const Strings = () => (
  <div className="Strings">
    {
      Array(6).fill(null).map((_, string) => (
        <String
          key={`string-${string}`}
          string={string + 1}
        />
      ))
    }
  </div>
);

export default Strings;
