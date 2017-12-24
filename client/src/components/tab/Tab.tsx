import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { withNotation } from 'enhancers';
import TabParser from './TabParser';

interface TabProps {
  notation: Enhancers.Notation
}

const enhance = compose(
  withNotation
);

const Tab = ({ notation }) => (
  <div className="Tab">
    <TabParser />
    Tab
  </div>
);

export default enhance(Tab);
