import * as React from 'react';
import { Link } from 'react-router-dom';
import { branch } from 'recompose';

const LoginLinkListItem = branch(
  ({ isLoggedIn }) => !isLoggedIn,
  i => i,
)(() => (
  <li>
    <Link to="/login">
      login
    </Link>
  </li>
));

const ActionBar = ({ isLoggedIn }) => (
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
      <LoginLinkListItem isLoggedIn={isLoggedIn} />
    </ul>
  </div>
);

export default ActionBar;
