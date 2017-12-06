import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Button, Checkbox, Form, Icon, Input, Alert } from 'antd';
import { User, Session } from 'types';
import { withUser, withSession } from 'enhancers';

const FormItem = Form.Item;

interface SignupProps {
  form: any;
  isLoggedIn: boolean;
  history: any;
  session: Session;
  signup(user: { user: User }): void;
}

interface SignupState {
  confirmDirty: boolean;
  loading: boolean;
  errors: Array<string>;
}

interface SignupStateUpdates {
  confirmDirty?: boolean;
  loading?: boolean;
  errors?: Array<string>;
}

class Signup extends React.Component<SignupProps, SignupState> {
  state: SignupState = {
    confirmDirty: false,
    loading: false,
    errors: []
  };

  componentWillMount(): void {
    this.maybeGoToLibrary();
  }

  maybeGoToLibrary(): void {
    if (this.props.session.isLoggedIn) {
      this.props.history.push('/library');
    }
  }

  checkPassword = (rule: object, value: string, callback: Function) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(`passwords don't match`);
    } else {
      callback();
    }
  }

  checkConfirm = (rule: object, value: string, callback: Function) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState(Object.assign({}, this.state, { confirmDirty: this.state.confirmDirty || !!value }));
  }

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, user) => {
      if (!err) {
        this.setState({ loading: true });

        try {
          const signupUser = Object.assign({}, user);
          delete signupUser.confirm;
          await this.props.signup({ user: signupUser });

          window.notification.info({
            message: 'Signup',
            description: `logged in as @${this.props.session.currentUser.username}`
          });
        } catch ({ responseJSON }) {
          if (responseJSON) {
            const errors = responseJSON.messages || [];
            this.updateState({ errors });
          }
        } finally {
          this.setState({ loading: false });
          this.maybeGoToLibrary();
        }
      }
    });
  }

  updateState = (stateUpdates: SignupStateUpdates): SignupState => {
    const nextErrors = Object.assign([], this.state.errors);
    const nextState = Object.assign({}, this.state, { errors: nextErrors, ...stateUpdates });
    this.setState(nextState);
    return nextState;
  }

  handleErrorClose = (event?: any): void => {
    // FIXME: HACK! Since the onClose event gets called
    // before the animation can finish
    window.setTimeout(() => this.updateState({ errors: [] }), 500);
  }

  render(): JSX.Element {
    const { getFieldDecorator } = this.props.form;
    const { errors } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };

    return (
      <div>
        <div className="Form">
          <h1 className="Form__title">SIGNUP</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="email" hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: 'please enter a valid email' },
                  { required: true, message: 'email is required' },
                  { max: 30, message: 'must be at most 30 characters' },
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="username" hasFeedback {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'username is required' },
                  { min: 3, message: 'must be at least 3 characters' },
                  { max: 30, message: 'must be at most 30 characters' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: 'must only contain letters, numbers, or underscores'},
                  { pattern: /[a-zA-Z0-9]{1,}/, message: 'must have at least one letter or number'}
                ],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'password is required' },
                { validator: this.checkConfirm },
                { min: 6, message: 'must be at least 6 characters' },
                { max: 20, message: 'must be at most 20 characters' },
                { pattern: /^((?![<>;]).)*$/, message: 'must not contain <, >, or ;'  }
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="confirm password"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'confirm your password' },
                { validator: this.checkPassword }
              ],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="Form__submit"
                loading={this.state.loading}
              >
                Signup
              </Button>
              <div className="Form__footer">
                <div>Already have an account?</div>
                <h3><Link to="login">Login</Link></h3>
              </div>
            </FormItem>
          </Form>
        </div>
        <div className="FormErrors">
          {
            errors.length === 0 ? null :
              <Alert
                closable
                className="FormErrors__messages"
                onClose={this.handleErrorClose}
                type="error"
                message={<ul>{errors.map((error, ndx) => <li key={`login-error-${ndx}`}>{error}</li>)}</ul>}
              />
          }
        </div>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withUser,
  withSession,
  Form.create()
);

export default enhance(Signup);
