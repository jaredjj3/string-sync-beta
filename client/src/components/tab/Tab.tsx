import * as React from 'react';
import { TabManager, Score } from './';
import { Overlap } from 'components';

interface TabProps {
  allowOverflow?: boolean;
  overrideWidth?: number;
  withCaret?: boolean;
}

const { Layer } = Overlap;

const Tab = ({ allowOverflow, overrideWidth, withCaret }: TabProps) => (
  <div className="Tab">
    <TabManager
      isDynamic={Boolean(withCaret)}
      overrideWidth={overrideWidth}
    />
    <Score
      withCaret={Boolean(withCaret)}
      allowOverflow={Boolean(allowOverflow)}
    />
  </div>
);

export default Tab;
