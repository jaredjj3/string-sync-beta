import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

import { User } from 'types/user';

const FormItem = Form.Item;

interface LoginProps {
  form: any;
  isLoggedIn: boolean;
  login(user: { user: User }): void;
}

interface LoginState {
  loading: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = { loading: false };

  maybeGoToLibrary(): void {
    if (this.props.isLoggedIn) {
      browserHistory.push('/');
    }
  }

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, user) => {
      if (!err) {
        this.setState({ loading: true });
        await this.props.login({ user });
        this.setState({ loading: false });
        this.maybeGoToLibrary();
      }
    });
  }

  render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="Form">
        <h1 className="Form__title">LOGIN</h1>
        <Form onSubmit={this.handleSubmit} className="Form__form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'username or email is required' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 14 }} />}
                placeholder="username or email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'password is required' }],
            })(
              <Input
                type="password"
                placeholder="password"
                prefix={<Icon type="lock" style={{ fontSize: 14 }} />}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="Form__submit"
              loading={this.state.loading}
            >
              Login
            </Button>
            <div className="Form__footer">
              <div>Don't have an account?</div>
              <h3><Link to="signup">Create an account</Link></h3>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

import { login } from 'data/session/actions';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser.id)
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
