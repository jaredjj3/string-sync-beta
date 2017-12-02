import API from '../api';
import { getNullUser } from 'stringSyncUtil';
import { camelCaseObjKeys } from 'stringSyncUtil';

export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export const setUser = user => ({
  type: SET_USER,
  user
});

export const resetUser = () => ({
  type: RESET_USER
});

export const login = user => async dispatch => {
  try {
    const currentUser = await API.login(user);
    dispatch(setUser(camelCaseObjKeys(currentUser, false)));
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
};

export const logout = () => async dispatch => {
  try {
    const currentUser = await API.logout();
    dispatch(setUser(getNullUser()));
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
};
