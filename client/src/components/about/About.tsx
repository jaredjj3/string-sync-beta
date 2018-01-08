import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Overview, Contact, Roadmap, Social } from './';

const About = ({ match }) => (
  <div className="About">
    <Switch>
      <Route path={`${match.url}/overview`} component={Overview} />
      <Route path={`${match.url}/contact`} component={Contact} />
      <Route path={`${match.url}/social`} component={Social} />
      <Route path={`${match.url}/Roadmap`} component={Roadmap} />
    </Switch>
  </div>
);

export default About;
