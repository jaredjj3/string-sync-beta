import * as React from 'react';
import { branch } from 'recompose';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const SignupButton = branch(
  ({ isLoggedIn }) => !isLoggedIn,
  i => i
)(() => (
  <span>
    <Button size="large">
      <Link to="/signup">
        Join StringSync!
      </Link>
    </Button>
  </span>
));

export default SignupButton;
