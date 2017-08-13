import * as API from './api';
import { receiveUser } from 'data/session/actions';

export const signup = user => async dispatch => {
  const newUser = await API.createUser(user);
  dispatch(receiveUser(newUser));
};
