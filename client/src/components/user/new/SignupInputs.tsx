import * as React from 'react';
import { Input, Icon } from 'antd';

// https://ant.design/components/form/#getFieldDecorator(id,-options)-parameters
const BASE_DECORATOR_OPTS = {
  validateTrigger: 'onBlur'
};

export const EmailInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { type: 'email', message: 'please enter a valid email' },
      { required: true, message: 'email is required' },
      { max: 30, message: 'must be at most 30 characters' },
    ]
  });

  const decorate = form.getFieldDecorator('email', fieldDecoratorOpts);
  return decorate(<Input />);
};

export const UsernameInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'username is required' },
      { min: 3, message: 'must be at least 3 characters' },
      { max: 30, message: 'must be at most 30 characters' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: 'must only contain letters, numbers, or underscores'},
      { pattern: /[a-zA-Z0-9]{1,}/, message: 'must have at least one letter or number'}
    ]
  });

  const decorate = form.getFieldDecorator('username', fieldDecoratorOpts);
  return decorate(<Input />);
};

export const PasswordInput = (form) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'password is required' },
      { validator: this.checkConfirm },
      { min: 6, message: 'must be at least 6 characters' },
      { max: 20, message: 'must be at most 20 characters' },
      { pattern: /^((?![<>;]).)*$/, message: 'must not contain <, >, or ;'  }
    ]
  });

  const decorate = form.getFieldDecorator('password', fieldDecoratorOpts);
  return decorate(<Input type="password" />);
};

// validator for the password confirm
const checkPassword = form => (rule, value, callback) => {
  if (value && value !== form.getFieldValue('password')) {
    callback('passwords do not match');
  } else {
    callback();
  }
};

export const PasswordConfirmInput = (form, onBlur) => {
  const fieldDecoratorOpts = Object.assign({}, BASE_DECORATOR_OPTS, {
    rules: [
      { required: true, message: 'confirm your password' },
      { validator: checkPassword(form) }
    ]
  });

  const decorate = form.getFieldDecorator('confirm', fieldDecoratorOpts);
  return decorate(<Input type="password" onBlur={onBlur} />);
};
