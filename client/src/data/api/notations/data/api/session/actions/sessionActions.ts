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
  const currentUser = await API.login(user);
  dispatch(setUser(camelCaseObjKeys(currentUser, false)));
};

export const logout = () => async dispatch => {
  const currentUser = await API.logout();
  dispatch(setUser(getNullUser()));
  window.notification.success({
    message: 'Logout',
    description: 'successful'
  });
};
