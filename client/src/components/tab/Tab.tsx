import * as React from 'react';
import TabManager from './TabManager';
import Score from './Score';
import { Overlap } from 'components';

interface TabProps {
  allowOverflow?: boolean;
  overrideWidth?: number;
  withCaret?: boolean;
}

const { Layer } = Overlap;

const Tab = ({ allowOverflow, overrideWidth, withCaret }: TabProps) => (
  <div className="Tab">
    {/* rendering order matters! */}
    <TabManager
      isDynamic={withCaret}
      overrideWidth={overrideWidth}
    />
    <Score
      withCaret={Boolean(withCaret)}
      allowOverflow={Boolean(allowOverflow)}
    />
  </div>
);

export default Tab;
