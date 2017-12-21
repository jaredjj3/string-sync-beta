import * as React from 'react';
import { Form } from 'antd';
import { compose, withState, withHandlers } from 'recompose';

const { Item } = Form;

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

const enhance = compose(
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
  })
);

const checkPassword = props => (rule, value, callback) => {
  const { form } = props;
  if (value && value !== form.getFieldValue('password')) {
    callback('passwords do not match');
  } else {
    callback();
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

const Signup = () => (
  <div className="Signup">
    <div className="Form">
      <h1 className="Form__title">SIGNUP</h1>
      <Form>
        <Item>
        </Item>
      </Form>
    </div>
  </div>
);

export default enhance(Signup);
