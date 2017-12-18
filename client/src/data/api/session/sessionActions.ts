import * as API from './sessionApi';
import * as constants from './sessionConstants';
import { getNullUser, camelCaseObjKeys } from 'ssUtil';

export const setUser = user => ({
  type: constants.SET_USER,
  user
});

export const resetUser = () => ({
  type: constants.RESET_USER
});

export const login = user => async dispatch => {
  const currentUser = await API.login(user);
  dispatch(setUser(camelCaseObjKeys(currentUser, false)));
};

export const logout = () => async dispatch => {
  const currentUser = await API.logout();
  dispatch(resetUser());
};
