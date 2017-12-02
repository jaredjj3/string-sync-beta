import { reduxConnect } from 'stringSyncUtil';
import { userActions as actions } from 'data/api/user';

const withUser = reduxConnect(
  null,
  dispatch => ({
    signup: user => dispatch(actions.signup(user))
  })
);

export default withUser;
