import * as React from 'react';
import SignupErrors from 'components/user/new/SignupErrors';
import SignupFooter from './SignupFooter';
import { EmailInput, UsernameInput, PasswordInput, PasswordConfirmInput } from './SignupInputs';
import { Form, Button } from 'antd';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { withSession, withViewport, withUser } from 'enhancers';

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

const enhance = compose(
  Form.create(),
  withSession,
  withUser,
  withViewport,
  withState('confirmDirty', 'setConfirmDirty', false),
  withState('loading', 'setLoading', false),
  withState('errors', 'setErrors', []),
  withProps(props => ({
    trySignup: async user => {
      try {
        const signupUser = Object.assign({}, user);
        delete signupUser.confirm;
        await props.user.dispatch.signup({ user: signupUser });

        window.notification.info({
          message: 'Signup',
          description: `logged in as @${signupUser.username}`
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
    checkConfirm: (rule, value, callback) => {
      const { form, confirmDirty } = props;
      if (value && confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }

      callback();
    },
    afterValidate: (errors, user) => {
      if (!errors) {
        props.trySignup(user);
      }
    },
  })),
  withHandlers({
    handleConfirmBlur: props => event => {
      const { value } = event.target;
      props.setConfirmDirty(props.confirmDirty || !!value);
    },
    handleSubmit: props => event => {
      event.preventDefault();
      props.form.validateFields(props.afterValidate);
    },
    handleErrorClose: props => event => {
      // FIXME: HACK! Since the onClose event gets called
      // before the animation can finish. Probably should
      // wrap in a CSSTransitionGroup component eventually.
      window.setTimeout(() => props.setErrors([]), 500);
    }
  })
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
