import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import { Button, Form, Input } from 'antd';
import { UsernameInput, PasswordInput } from './LoginInputs';
import LoginErrors from './LoginErrors';
import { withSession } from 'enhancers';
import { withRouter } from 'react-router-dom';

const { Item } = Form;

interface LoginProps {
  form: any;
  loading: boolean;
  errors: Array<string>;
  session: Enhancers.Session;
  history: any;
  setErrors(errors: Array<string>): void;
  setLoading(loading: boolean): void;
}

const enhance = compose(
  Form.create(),
  withSession,
  withRouter,
  withState('loading', 'setLoading', false),
  withState('errors', 'setErrors', [])
);

class Login extends React.Component<LoginProps, any> {
  static LoginFooter = () => (
    <div className="Form__footer">
      <div>Don't have an account?</div>
      <h3>
        <Link to="/signup">
          Create an account
        </Link>
      </h3>
    </div>
  )

  maybeGoToLibrary = () => {
    if (this.props.session.state.isLoggedIn) {
      this.props.history.push('/library');
    }
  }

  tryLogin = async (user: any) => {
    try {
      await this.props.session.dispatch.login(user);
      window.notification.success({
        message: 'Login',
        description: `logged in as @${this.props.session.state.currentUser.username}`
      });
    } catch ({ responseJSON }) {
      if (responseJSON) {
        const errors = responseJSON.messages || [];
        this.props.setErrors(errors);
      }
    } finally {
      this.props.setLoading(false);
      this.maybeGoToLibrary();
    }
  }

  afterValidate = (validationErrors: any, user: FormUser) => {
    if (!validationErrors) {
      this.tryLogin(user);
    }
  }

  handleSubmit = (event: any): void => {
    event.preventDefault();
    this.props.form.validateFields(this.afterValidate);
  }

  handleErrorClose = (event: any): void => {
    // FIXME: HACK! Since the onClose event gets called
    // before the animation can finish. Probably should
    // wrap in a CSSTransitionGroup component eventually.
    window.setTimeout(() => this.props.setErrors([]), 500);
  }

  render(): JSX.Element {
    const { form, loading, errors } = this.props;

    return (
      <div className="Login">
        <div className="Form--desktop">
          <h1 className="Form__title">LOGIN</h1>
          <Form
            className="Form__form"
            onSubmit={this.handleSubmit}
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
              <Login.LoginFooter />
            </Item>
          </Form>
        </div>
        <LoginErrors
          errors={errors}
          onErrorClose={this.handleErrorClose}
        />
      </div>
    );
  }
}

export default enhance(Login);
