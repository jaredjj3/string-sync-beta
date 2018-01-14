import * as React from 'react';
import { compose, branch, renderNothing } from 'recompose';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const enhance = compose (
  branch(
    ({ isLoggedIn }) => !isLoggedIn,
    i => i,
    renderNothing
  )
)

const SignupButton = () => (
  <span>
    <Button size="large">
      <Link to="/signup">
        Join StringSync!
      </Link>
    </Button>
  </span>
);

export default enhance(SignupButton);
