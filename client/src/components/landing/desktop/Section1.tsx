import * as React from 'react';
import { compose, mapProps, shouldUpdate } from 'recompose';
import { SignupButton } from './';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { withSession } from 'enhancers';
import styled from 'styled-components';

const enhance = compose(
  withSession,
  mapProps(props => ({
    isLoggedIn: props.session.state.isLoggedIn
  })),
  shouldUpdate((currProps, nextProps) => (
    currProps.isLoggedIn !== nextProps.isLoggedIn
  ))
);

const DesktopLandingTitle = styled.h1`
  font-size: 48px;
  font-weight: 100;
  margin-top: 48px;
  text-align: center;
`;
const DesktopLandingActionBar = styled.div`
  text-align: center;
  margin-top: 7px;

  button {
    width: 196px;
    height: 38px;
  }

  span {
    margin: 0 10px;
  }
`;

const Section1 = ({ isLoggedIn }) => (
  <section>
    <DesktopLandingTitle>
      Learn more. Think less.
    </DesktopLandingTitle>
    <DesktopLandingActionBar>
      <span>
        <Button size="large" type="primary">
          <Link to="/library">
            Discover new music!
          </Link>
        </Button>
      </span>
      <SignupButton isLoggedIn={isLoggedIn} />
    </DesktopLandingActionBar>
  </section>
);

export default enhance(Section1);
