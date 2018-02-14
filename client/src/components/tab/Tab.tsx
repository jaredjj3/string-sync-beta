import * as React from 'react';
import { TabController, Score } from './';
import { Overlap, Layer } from 'components';
import styled from 'styled-components';

interface TabProps {
  overrideWidth?: number;
  withCaret?: boolean;
}

const TabOuter = styled.div`
`;

const Tab = ({ overrideWidth, withCaret }: TabProps) => (
  <TabOuter id="Tab" className="Tab">
    <TabController
      isDynamic={Boolean(withCaret)}
      overrideWidth={overrideWidth}
    />
    <Score withCaret={Boolean(withCaret)} />
  </TabOuter>
);

export default Tab;
