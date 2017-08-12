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
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="password" />
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
