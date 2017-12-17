import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { compose } from 'recompose';

import NotationEdit from './edit';
import NotationShow from './show';
import NotationPrint from './print';

const Notation = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:id/edit`} component={NotationEdit} />
    <Route path={`${match.url}/:id/print`} component={NotationPrint} />
    <Route path={`${match.url}/:id`} component={NotationShow} />
  </Switch>
);

const enhance = compose(
  withRouter
);

export default enhance(Notation);
