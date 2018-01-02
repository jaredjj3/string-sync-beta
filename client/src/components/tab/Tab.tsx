import * as React from 'react';
import TabService from './TabService';
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
    <TabService
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
