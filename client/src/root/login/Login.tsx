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

  componentWillReceiveProps (nextProps: LoginProps): void {
    if (nextProps.isLoggedIn) {
      this.setState({ loading: true });
      browserHistory.push('/');
    }
  }

  handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, user) => {
      if (!err) {
        this.props.login({ user });
      }
    });
  }

  render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="Login">
        <h1 className="Login__title">LOGIN</h1>
        <Form onSubmit={this.handleSubmit} className="Login__form">
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
              className="Login__form__button"
              loading={this.state.loading}
            >
              Login
            </Button>
            <div className="Login__form__footer">
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
