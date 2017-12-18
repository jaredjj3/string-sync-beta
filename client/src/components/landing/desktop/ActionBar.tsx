import * as React from 'react';
import { Link } from 'react-router-dom';
import { branch, compose, shouldUpdate } from 'recompose';
import { withSession } from 'enhancers';

const showIfLoggedIn = branch(
  ({ isLoggedIn }) => !isLoggedIn,
  i => i,
);

const LoginLinkListItem = showIfLoggedIn(() => (
  <li>
    <Link to="/login">
      login
    </Link>
  </li>
));

const ActionBar = ({ session }) => (
  <div className="Landing--desktop__altActionBar">
    <ul className="AltActionBar__links">
      <li>
        <Link to="/about">
          about
        </Link>
      </li>
      <li>
        <a href="http://instagram.com/stringsynced">
          social
        </a>
      </li>
      <li>
        <Link to="/library">
          library
        </Link>
      </li>
      <LoginLinkListItem isLoggedIn={session.state.isLoggedIn} />
    </ul>
  </div>
);

const enhance = compose(
  withSession,
  shouldUpdate((props, nextProps) => (
    props.session.state.isLoggedIn !== nextProps.session.state.isLoggedIn
  ))
);

export default enhance(ActionBar);
