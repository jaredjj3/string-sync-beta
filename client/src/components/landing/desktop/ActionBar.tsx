import * as React from 'react';
import { Link } from 'react-router-dom';
import { branch, renderNothing, compose, shouldUpdate } from 'recompose';
import { withSession } from 'enhancers';

const showIfNotLoggedIn = branch(
  ({ isLoggedIn }) => !isLoggedIn,
  i => i,
  renderNothing
);

const enhance = compose(
  withSession,
  shouldUpdate((props, nextProps) => (
    props.session.state.isLoggedIn !== nextProps.session.state.isLoggedIn
  ))
);

const LoginLinkListItem = showIfNotLoggedIn(() => (
  <li>
    <Link to="/login">
      login
    </Link>
  </li>
));

const ActionBar = ({ session }) => (
  <nav className="Landing--desktop__altActionBar">
    <ul className="AltActionBar__links">
      <li>
        <Link to="/about/overview">
          about
        </Link>
      </li>
      <li>
        <Link to="/library">
          library
        </Link>
      </li>
      <LoginLinkListItem isLoggedIn={session.state.isLoggedIn} />
    </ul>
  </nav>
);

export default enhance(ActionBar);
