import * as React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { TabController, Score } from './';
import { Overlap, Layer } from 'components';
import styled from 'styled-components';
import { isEqual } from 'lodash';

interface TabProps {
  overrideWidth?: number;
  withCaret?: boolean;
  
}

const enhance = compose(
  shouldUpdate((props, nextProps) => !isEqual(props, nextProps))
);

const TabOuter = styled.div`
  min-height: 520px;
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

export default enhance(Tab);
