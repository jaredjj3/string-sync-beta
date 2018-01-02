import * as React from 'react';
import TabService from './TabService';
import Score from './Score';
import { Overlap } from 'components';

interface TabProps {
  allowOverflow?: boolean;
}

const { Layer } = Overlap;

const Tab = ({ allowOverflow }: TabProps) => (
  <div className="Tab">
    <TabService />
    <Score allowOverflow={!!allowOverflow} />
  </div>
);

export default Tab;
