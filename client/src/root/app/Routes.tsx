import * as React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, Landing, Library, Login, Signup, Notation, NotationNew, About } from 'components';

const Routes = () => (
  <div id="Routes" className="Routes">
    <Route exact path="/" component={Landing} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/library" component={Library} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/n" component={Notation} />
    <Route path="/upload" component={NotationNew} />
    <Route path="/about" component={About} />
  </div>
);

export default Routes;
