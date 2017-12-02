import API from '../api';
import { sessionActions } from 'data/api/session';
import { ignoreIfExecuting } from 'stringSyncUtil';

const { setUser } = sessionActions;

export const signup = ignoreIfExecuting(user => async dispatch => {
  try {
    const newUser = await API.createUser(user);
    dispatch(setUser(newUser));
    window.notification.info({
      message: 'Signup',
      description: `logged in as @${newUser.username}`
    });
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: 'something went wrong',
      duration: 2
    });
  }
});
