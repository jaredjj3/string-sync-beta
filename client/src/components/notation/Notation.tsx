import * as React from 'react';
import { compose, lifecycle } from 'recompose';
import { Route, Switch } from 'react-router-dom';
import { NotationEdit, NotationPrint, NotationShow } from './';
import { withNotation } from 'enhancers';

const enhance = compose(
  withNotation,
  lifecycle({
    componentWillUnmount(): void {
      this.props.notation.dispatch.resetNotation();
    }
  })
);

const Notation = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/:id/edit`} component={NotationEdit} />
    <Route path={`${match.url}/:id/print`} component={NotationPrint} />
    <Route path={`${match.url}/:id`} component={NotationShow} />
  </Switch>
);

export default Notation;
