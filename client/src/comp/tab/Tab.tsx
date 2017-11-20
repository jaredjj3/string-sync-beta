import React from 'react';

import Score from './score';
import Caret from './caret';
import Overlap from 'comp/overlap';

const { Layer } = Overlap;

const Tab = () => (
  <div className="Tab">
    <Overlap height="300px" width="100vw">
      <Layer className="CaretContainer">
        <Caret />
      </Layer>
      <Layer
        id="ScoreContainer"
        className="ScoreContainer"
      >
        <Score />
      </Layer>
    </Overlap>
  </div>
);

export default Tab;
