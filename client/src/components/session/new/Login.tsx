import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, toClass } from 'recompose';
import { Button, Form, Input } from 'antd';
import { UsernameInput, PasswordInput } from './LoginInputs';
import Errors from './LoginErrors';

const { Item } = Form;

const tryLogin = async (props, user: FormUser) => {
  try {
    await props.login({ user });
    window.notification.success({
      message: 'Login',
      description: `logged in as @${props.session.state.currentUser.username}`
    });
  } catch ({ responseJSON }) {
    if (responseJSON) {
      const errors = responseJSON.messages || [];
      props.setErrors(errors);
    }
  } finally {
    if (!props.session.state.isLoggedIn) {
      props.setLoading(false);
    }
  }
};

const afterValidate = props => (validationError, user: FormUser) => {
  // Don't need to do anything with the validation errors since
  // ant design's Form component does the displaying for us.
  if (!validationError) {
    tryLogin(props, user);
  }
};

const enhance = compose(
  toClass,
  withState('loading', 'setLoading', false),
  withState('errors', 'addErrors', []),
  withHandlers({
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields(afterValidate(props));
    },
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => props.setErrors([]), 500);
    }
  }),
  Form.create()
);

const Footer = () => (
  <div className="Form__footer">
    <div>Don't have an account?</div>
    <h3>
      <Link to="/signup">
        Create an account
      </Link>
    </h3>
  </div>
);

const Login = ({ handleSubmit, handleErrorClose, form, loading, errors }) => (
  <div className="Login">
    <div className="Form">
      <h1 className="Form__title">LOGIN</h1>
      <Form
        className="Form__form"
        onSubmit={handleSubmit}
      >
        <Item>
          <UsernameInput form={form} />
        </Item>
        <Item>
          <PasswordInput form={form} />
        </Item>
        <Item>
          <Button
            className="Form__submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Login
          </Button>
          <Footer />
        </Item>
      </Form>
    </div>
    <Errors
      errors={errors}
      onErrorClose={handleErrorClose}
    />
  </div>
);

export default enhance(Login);
