import { connect } from 'react-redux';
import { userActions } from 'data/api/user';
import { sessionActions } from 'data/api/session';

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(userActions.signup(user)),
  setUser: user => dispatch(sessionActions.setUser(user)),
  resetUser: () => dispatch(sessionActions.resetUser())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  user: {
    dispatch: dispatchProps
  }
});

const withUser = Component => connect(
  null,
  mapDispatchToProps,
  mergeProps
)(Component);

export default withUser;
