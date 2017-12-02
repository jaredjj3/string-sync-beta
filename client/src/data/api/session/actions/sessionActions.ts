import API from '../api';
import { getNullUser } from 'stringSyncUtil';
import { ignoreIfExecuting, camelCaseObjKeys } from 'stringSyncUtil';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RESET_USER = 'RESET_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const resetUser = () => ({
  type: RESET_USER
});

export const login = ignoreIfExecuting(user => async dispatch => {
  try {
    const currentUser = await API.login(user);
    dispatch(receiveUser(camelCaseObjKeys(currentUser, false)));
    window.notification.success({
      message: 'Login',
      description: `logged in as @${currentUser.username}`
    });
  } catch (error) {
    window.notification.error({
      message: 'Login',
      description: 'something went wrong',
      duration: 2
    });
  }
});

export const logout = ignoreIfExecuting(user => async dispatch => {
  try {
    const currentUser = await API.logout();
    dispatch(receiveUser(getNullUser()));
    window.notification.success({
      message: 'Logout',
      description: 'successful'
    });
  } catch (error) {
    window.notification.error({
      message: 'Logout',
      description: 'something went wrong',
      duration: 2
    });
  }
});
