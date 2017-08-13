import * as API from './api';
import getNullUser from 'util/getNullUser';

export const RECEIVE_USER = 'session/RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const login = user => async dispatch => {
  const { notify, notifyAll } = window as any;

  try {
    const currentUser = await API.login(user);
    dispatch(receiveUser(currentUser));
    notify('Login', `logged in as @${currentUser.username}`, { type: 'info' });
  } catch ({ responseJSON }) {
    notifyAll('Login', responseJSON, { duration: 10 });
  }
};

export const logout = () => async dispatch => {
  const { notify, notifyAll } = window as any;

  try {
    await API.logout();
    dispatch(receiveUser(getNullUser()));
    notify('Logout', 'successful', { type: 'success' });
  } catch ({ responseJSON }) {
    notifyAll('Logout', responseJSON);
  }
};
