import * as React from 'react';
import { Link } from 'react-router-dom';
import { branch, renderNothing, compose, shouldUpdate } from 'recompose';
import { withSession } from 'enhancers';
import styled from 'styled-components';

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

const ActionBarNav = styled.nav``;
const ActionBarLinks = styled.ul`
  list-style: none;
  list-style-type: none;
  padding-left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const ActionBarLinkItem = styled.li`
  font-size: 14px;
  font-weight: 200;
  margin: 0 14px;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const LoginLinkListItem = showIfNotLoggedIn(() => (
  <ActionBarLinkItem>
    <Link to="/login">
      login
    </Link>
  </ActionBarLinkItem>
));

const ActionBar = ({ session }) => (
  <ActionBarNav>
    <ActionBarLinks>
      <ActionBarLinkItem>
        <Link to="/about/overview">
          about
        </Link>
      </ActionBarLinkItem>
      <ActionBarLinkItem>
        <Link to="/library">
          library
        </Link>
      </ActionBarLinkItem>
      <LoginLinkListItem isLoggedIn={session.state.isLoggedIn} />
    </ActionBarLinks>
  </ActionBarNav>
);

export default enhance(ActionBar);
