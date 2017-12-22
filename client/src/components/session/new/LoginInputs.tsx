import * as React from 'react';
import { Input, Icon } from 'antd';

// https://ant.design/components/form/#getFieldDecorator(id,-options)-parameters
const BASE_DECORATOR_OPTS = {

};

export const UsernameInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'username or email is required' }
    ]
  });

  return (
    form.getFieldDecorator('username', fieldDecoratorOpts)(
      <Input
        prefix={<Icon type="user" style={{ fontSize: '14px' }} />}
        placeholder="username or email"
      />
    )
  );
};

export const PasswordInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'password is required' }
    ]
  });

  return (
    form.getFieldDecorator('password', fieldDecoratorOpts)(
      <Input
        type="password"
        placeholder="password"
        prefix={<Icon type="lock" style={{ fontSize: 14 }} />}
      />
    )
  );
};
