import { reduxConnect } from 'stringSyncUtil';
import { sessionActions as actions } from 'data/api/session';

const withSession = reduxConnect(
  state => ({
    session: state.session
  }),
  dispatch => ({
    setUser: user => dispatch(actions.setUser(user)),
    resetUser: () => dispatch(actions.resetUser()),
    login: user => dispatch(actions.login(user)),
    logout: () => dispatch(actions.logout())
  })
);

export default withSession;
