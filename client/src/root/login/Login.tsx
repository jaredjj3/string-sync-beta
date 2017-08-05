import React from 'react';
import { connect } from 'react-redux';

interface LoginProps {};

interface LoginState {};

class Login extends React.Component<LoginProps, LoginState> {
  public render(): JSX.Element {
    return (<span>Login</span>);
  }
}

export default connect()(Login);
