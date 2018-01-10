import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, branch, renderComponent } from 'recompose';
import { withSession } from 'enhancers';
import { MobileNavLogin, MobileNavLogout } from './';

const enhance = compose(
  withSession,
  branch(
    ({ session }) => session.state.isLoggedIn,
    renderComponent(MobileNavLogout),
    renderComponent(MobileNavLogin)
  )
);

const MobileNavRight = () => null;

export default enhance(MobileNavRight);
