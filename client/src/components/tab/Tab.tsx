import * as React from 'react';
import TabService from './TabService';
import Score from './Score';
import Caret from './caret';
import { Overlap } from 'components';

const { Layer } = Overlap;

const Tab = () => (
  <div className="Tab">
    <TabService />
    <Overlap>
      <Layer style={{ zIndex: 10 }}>
        <Score />
      </Layer>
      <Layer style={{ zIndex: 11 }}>
        <Caret />
      </Layer>
    </Overlap>
  </div>
);

export default Tab;
