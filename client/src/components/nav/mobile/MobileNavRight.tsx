import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, branch, renderNothing, renderComponent } from 'recompose';
import { Icon } from 'antd';
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

const MobileNavRight = () => renderNothing();

export default enhance(MobileNavRight);
