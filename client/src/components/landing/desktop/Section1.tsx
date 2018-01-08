import * as React from 'react';
import { compose, shouldUpdate } from 'recompose';
import { SignupButton } from './';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { withSession } from 'enhancers';

const enhance = compose(
  withSession,
  shouldUpdate((props, nextProps) => (
    props.session.state.isLoggedIn !== nextProps.session.state.isLoggedIn
  ))
);

const Section1 = ({ session }) => (
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
      <SignupButton isLoggedIn={session.state.isLoggedIn} />
    </div>
  </section>
);

export default enhance(Section1);
