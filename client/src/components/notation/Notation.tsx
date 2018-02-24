import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotationEdit, NotationPrint, NotationShow, NotationStudio } from './';
import { withNotation } from 'enhancers';

const Notation = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:id/edit`} component={NotationEdit} />
    <Route path={`${match.url}/:id/print`} component={NotationPrint} />
    <Route path={`${match.url}/:id/studio`} component={NotationStudio} />
    <Route path={`${match.url}/:id`} component={NotationShow} />
  </Switch>
);

export default Notation;
