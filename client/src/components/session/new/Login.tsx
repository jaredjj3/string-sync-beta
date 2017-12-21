import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, toClass, shouldUpdate } from 'recompose';
import { Button, Form, Input } from 'antd';
import { UsernameInput, PasswordInput } from './LoginInputs';
import Errors from './LoginErrors';
import classNames from 'classnames';
import withViewport from 'enhancers/withViewport';

const { Item } = Form;

const maybeGoToLibrary = props => {
  if (props.session.state.isLoggedIn) {
    props.history.push('/library');
  }
};

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
    props.setLoading(false);
    maybeGoToLibrary(props);
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
  withViewport,
  shouldUpdate((currProps, nextProps) => (
    currProps.viewport.state.type !== nextProps.viewport.state.type
  )),
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

const LoginFooter = () => (
  <div className="Form__footer">
    <div>Don't have an account?</div>
    <h3>
      <Link to="/signup">
        Create an account
      </Link>
    </h3>
  </div>
);

const getFormClassNames = (viewport: Enhancers.Viewport) => {
  const { type } = viewport.state;

  return classNames(
    'Form',
    {
      'Form--desktop': type === 'DESKTOP',
      'Form--mobile': type === 'MOBILE'
    }
  );
};

const Login = ({ handleSubmit, handleErrorClose, form, loading, errors, viewport }) => (
  <div className="Login">
    <div className={getFormClassNames(viewport)}>
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
          <LoginFooter />
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
