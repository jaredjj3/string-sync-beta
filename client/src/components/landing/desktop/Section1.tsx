import * as React from 'react';
import { compose, mapProps, shouldUpdate } from 'recompose';
import { SignupButton } from './';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { withSession } from 'enhancers';

const enhance = compose(
  withSession,
  mapProps(props => ({
    isLoggedIn: props.session.state.isLoggedIn
  })),
  shouldUpdate((currProps, nextProps) => (
    currProps.isLoggedIn !== nextProps.isLoggedIn
  ))
);

const Section1 = ({ isLoggedIn }) => (
  <section>
    <h1 className="Landing--desktop__title">
      Learn more. Think less.
    </h1>
    <div className="Landing--desktop__actionBar">
      <span>
        <Button size="large" type="primary">
          <Link to="/library">
            Discover new music!
          </Link>
        </Button>
      </span>
      <SignupButton isLoggedIn={isLoggedIn} />
    </div>
  </section>
);

export default enhance(Section1);
