import * as API from './api';
import getNullUser from 'util/getNullUser';

export const RECEIVE_USER = 'session/RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const login = user => async dispatch => {
  const currentUser = await API.login(user);
  dispatch(receiveUser(currentUser));
};

export const logout = () => async dispatch => {
  await API.logout();
  dispatch(receiveUser(getNullUser()));
};
