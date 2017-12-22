import * as React from 'react';
import { Form, Button } from 'antd';
import { compose, withState, withHandlers } from 'recompose';
import withSession from 'enhancers/withSession';
import withViewport from 'enhancers/withViewport';
import { Link } from 'react-router-dom';
import SignupErrors from 'components/user/new/SignupErrors';
import { EmailInput, UsernameInput, PasswordInput, PasswordConfirmInput } from './SignupInputs';
import withUser from 'enhancers/withUser';

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

const trySignup = async (props, user) => {
  try {
    const signupUser = Object.assign({}, user);
    delete signupUser.confirm;
    await props.user.dispatch.signup({ user: signupUser });

    window.notification.info({
      message: 'Signup',
      description: `logged in as @${props.session.state.currentUser.username}`
    });

    props.history.push('/library');
  } catch (error) {
    if (error.responseJSON) {
      const errors = error.responseJSON.messages || [];
      props.setErrors(errors);
    } else {
      window.notification.error({
        message: 'Signup',
        description: error.message
      });
    }
  } finally {
    props.setLoading(false);
  }
};

const afterValidate = props => (errors, user) => {
  if (!errors) {
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
  Form.create(),
  withSession,
  withUser,
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
      event.preventDefault();
      props.form.validateFields(afterValidate(props));
    },
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => props.setErrors([]), 500);
    }
  })
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

const Signup = ({ form, loading, errors, handleSubmit, handleErrorClose, handleConfirmBlur }) => (
  <div className="Signup">
    <div className="Form">
      <h1 className="Form__title">SIGNUP</h1>
      <Form onSubmit={handleSubmit}>
        <Item
          hasFeedback
          colon={false}
          label="email"
          {...formItemLayout}
        >
          {EmailInput(form)}
        </Item>
        <Item
          hasFeedback
          colon={false}
          label="username"
          {...formItemLayout}
        >
          {UsernameInput(form)}
        </Item>
        <Item
          hasFeedback
          colon={false}
          label="password"
          {...formItemLayout}
        >
          {PasswordInput(form)}
        </Item>
        <Item
          hasFeedback
          colon={false}
          label="confirm password"
          {...formItemLayout}
        >
          {PasswordConfirmInput(form, handleConfirmBlur)}
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
