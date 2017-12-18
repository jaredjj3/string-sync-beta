import * as React from 'react';
import SignupButton from './SignupButton';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

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

export default Section1;
