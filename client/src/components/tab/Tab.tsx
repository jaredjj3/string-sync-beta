import * as React from 'react';
import { TabAdapter, Score } from './';
import { Overlap, Layer } from 'components';

interface TabProps {
  allowOverflow?: boolean;
  overrideWidth?: number;
  withCaret?: boolean;
}

const Tab = ({ allowOverflow, overrideWidth, withCaret }: TabProps) => (
  <div className="Tab">
    <TabAdapter
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
