import * as API from './api';
import { receiveUser } from 'data/session/actions';

export const signup = user => async dispatch => {
  const { notify, notifyAll } = window as any;

  try {
    const newUser = await API.createUser(user);
    dispatch(receiveUser(newUser));
    notify('Signup', `logged in as @${newUser.username}`, { type: 'info' });
  } catch ({ responseJSON }) {
    notifyAll('Signup', responseJSON, { duration: 10 });
  }
};
