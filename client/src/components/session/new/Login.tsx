import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { Button, Form, Input } from 'antd';
import { UsernameInput, PasswordInput } from './LoginInputs';
import LoginErrors from './LoginErrors';
import { withSession } from 'enhancers';
import { withRouter } from 'react-router-dom';
import { Gradient, Nav } from 'components';

const { Item } = Form;

const enhance = compose(
  Form.create(),
  withSession,
  withRouter,
  withState('loading', 'setLoading', false),
  withState('errors', 'setErrors', []),
  withProps(props => ({
    tryLogin: async user => {
      try {
        await props.session.dispatch.login(user);
        window.notification.success({
          message: 'Login',
          description: `logged in as @${user.username}`
        });

        props.setLoading(false);
        props.history.push('/library');
      } catch (error) {
        if (error.responseJSON) {
          const errors = error.responseJSON.messages || [];
          props.setErrors(errors);
        } else {
          console.error(error);
        }

        props.setLoading(false);
      }
    }
  })),
  withProps(props => ({
    afterValidate: (errors, user) => {
      if (!errors) {
        props.tryLogin(user);
      }
    }
  })),
  withHandlers({
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => props.setErrors([]), 500);
    },
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields(props.afterValidate);
    }
  })
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

const Login = ({ form, errors, loading, handleSubmit, handleErrorClose }) => (
  <div className="Login">
    <Gradient />
    <Nav />
    <div className="Form--desktop">
      <h1 className="Form__title">LOGIN</h1>
      <Form
        className="Form__form"
        onSubmit={handleSubmit}
      >
        <Item>
          {UsernameInput(form)}
        </Item>
        <Item>
          {PasswordInput(form)}
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
    <LoginErrors
      errors={errors}
      onErrorClose={this.handleErrorClose}
    />
  </div>
);

export default enhance(Login);
