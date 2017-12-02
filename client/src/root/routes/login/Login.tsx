import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { User, Session } from 'types';
import { withSession } from 'enhancers';

const FormItem = Form.Item;

interface LoginProps {
  form: any;
  session: Session;
  history: any;
  login(user: { user: User }): void;
}

interface LoginState {
  loading: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = { loading: false };

  maybeGoToLibrary(): void {
    if (this.props.session.isLoggedIn) {
      this.props.history.push('/library');
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

const enhance = compose(
  withRouter,
  withSession,
  Form.create()
);

export default enhance(Login);
