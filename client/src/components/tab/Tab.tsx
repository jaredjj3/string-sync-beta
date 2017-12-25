import * as React from 'react';
import { compose } from 'recompose';
import TabService from './TabService';

const enhance = compose(

);

const Tab = ({ notation }) => (
  <div className="Tab">
    <TabService />
    Tab
  </div>
);

export default enhance(Tab);
