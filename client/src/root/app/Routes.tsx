import * as React from 'react';
import { Route } from 'react-router-dom';
import { Landing, Library, Login } from 'components';

const Routes = () => (
  <div id="Routes" className="Routes">
    <Route exact path="/" component={Landing} />
    <Route path="/library" component={Library} />
    <Route path="/login" component={} />
  </div>
);

export default Routes;
