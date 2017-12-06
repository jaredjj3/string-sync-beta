import API from '../api';
import { sessionActions } from 'data/api/session';

const { setUser } = sessionActions;

export const signup = user => async dispatch => {
  const newUser = await API.createUser(user);
  dispatch(setUser(newUser));
};
