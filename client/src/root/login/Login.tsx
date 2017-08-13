import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';

const FormItem = Form.Item;

interface LoginProps {
  form: any;
}

interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
            <Button type="primary" htmlType="submit" className="Login__form__button">
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

export default Form.create()(Login);
