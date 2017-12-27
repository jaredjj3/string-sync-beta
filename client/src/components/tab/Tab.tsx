import * as React from 'react';
import TabService from './TabService';
import Score from './Score';
import { Overlap } from 'components';

const { Layer } = Overlap;

const Tab = () => (
  <div className="Tab">
    <TabService />
    <Score />
  </div>
);

export default Tab;
