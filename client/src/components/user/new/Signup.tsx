import * as React from 'react';
import { Form, Button } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import withSession from 'enhancers/withSession';
import withViewport from 'enhancers/withViewport';
import { Link } from 'react-router-dom';
import SignupErrors from 'components/user/new/SignupErrors';
import { EmailInput, UsernameInput, PasswordInput, PasswordConfirmInput } from './SignupInputs';

const { Item } = Form;

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

const maybeGoToLibrary = props => {
  if (props.session.state.isLoggedIn) {
    props.history.push('/library');
  }
};

const trySignup = async (props, user) => {
  try {
    const signupUser = Object.assign({}, user);
    delete signupUser.confirm;
    await props.login({ user: signupUser });

    window.notification.info({
      message: 'Signup',
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

const afterValidate = props => (validationError, user) => {
  // Don't need to do anything with the validation errors since
  // ant design's Form component does the displaying for us.
  if (!validationError) {
    trySignup(props, user);
  }
};

const checkConfirm = props => (rule, value, callback) => {
  const { form, confirmDirty } = props;
  if (value && confirmDirty) {
    form.validateFields(['confirm'], { force: true });
  } else {
    callback();
  }
};

const enhance = compose(
  withSession,
  withViewport,
  withState('confirmDirty', 'setConfirmDirty', false),
  withState('loading', 'setLoading', false),
  withState('errors', 'setErrors', []),
  withHandlers({
    handleConfirmBlur: props => event => {
      const { value } = event.target;
      props.setConfirmDirty(props.confirmDirty || !!value);
    },
    handleSubmit: props => event => {
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

const SignupFooter = () => (
  <div className="Form__footer">
    <div>Already have an account?</div>
    <h3>
      <Link to="login">
        Login
      </Link>
    </h3>
  </div>
);

const Signup = ({ form, loading, errors, handleErrorClose, handleConfirmBlur }) => (
  <div className="Signup">
    <div className="Form">
      <h1 className="Form__title">SIGNUP</h1>
      <Form>
        <Item
          hasFeedback
          label="email"
          {...formItemLayout}
        >
          <EmailInput form={form} />
        </Item>
        <Item
          hasFeedback
          label="username"
          {...formItemLayout}
        >
          <UsernameInput form={form} />
        </Item>
        <Item
          hasFeedback
          label="password"
          {...formItemLayout}
        >
          <PasswordInput form={form} />
        </Item>
        <Item
          hasFeedback
          label="confirm password"
          {...formItemLayout}
        >
          <PasswordConfirmInput
            form={form}
            onBlur={handleConfirmBlur}
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            className="Form__submit"
            loading={loading}
          >
            Signup
          </Button>
          <SignupFooter />
        </Item>
      </Form>
    </div>
    <SignupErrors
      errors={errors}
      onErrorClose={handleErrorClose}
    />
  </div>
);

export default enhance(Signup);
