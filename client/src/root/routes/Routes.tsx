import * as React from 'react';
import { Route } from 'react-router-dom';
import { Landing } from 'components';

const Routes = () => (
  <div id="Routes" className="Routes">
    <Route exact path="/" component={Landing} />
  </div>
);

export default Routes;
