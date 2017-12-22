import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers } from 'recompose';
import { Button, Form, Input } from 'antd';
import { UsernameInput, PasswordInput } from './LoginInputs';
import LoginErrors from './LoginErrors';
import { withSession } from 'enhancers';
import { withRouter } from 'react-router-dom';

const { Item } = Form;

const enhance = compose(
  Form.create(),
  withSession,
  withRouter,
  withState('loading', 'setLoading', false),
  withState('errors', 'setErrors', []),
  withHandlers({
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => this.props.setErrors([]), 500);
    },
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields(props.afterValidate);
    },
    tryLogin: props => async user => {
      try {
        await this.props.session.dispatch.login(user);
        window.notification.success({
          message: 'Login',
          description: `logged in as @${this.props.session.state.currentUser.username}`
        });
      } catch ({ responseJSON }) {
        if (responseJSON) {
          const errors = responseJSON.messages || [];
          props.setErrors(errors);
        }
      } finally {
        props.setLoading(false);
        props.maybeGoToLibrary();
      }
    },
    afterValidate: props => (errors, user) => {
      if (!errors) {
        props.tryLogin(user);
      }
    },
    maybeGoToLibrary: props => () => {
      if (props.session.state.isLoggedIn) {
        props.history.push('/library');
      }
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
