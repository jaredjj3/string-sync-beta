import * as React from 'react';
import { Link } from 'react-router-dom';

const SignupFooter = () => (
  <div className="Form__footer">
    <div>Already have an account?</div>
    <h3>
      <Link to="login">
        Login
      </Link>
    </h3>
  </div>
);

export default SignupFooter;
