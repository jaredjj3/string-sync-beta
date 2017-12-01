import * as API from './api';
import { receiveUser } from 'data/session/actions';

export const signup = user => async dispatch => {
  try {
    const newUser = await API.createUser(user);
    dispatch(receiveUser(newUser));
    window.notification.info({
      message: 'Signup',
      description: `logged in as @${newUser.username}`
    });
  } catch ({ responseJSON }) {
    const { messages }  = responseJSON;
    if (messages) {
      messages.forEach(description => window.notification.error({
        message: 'Notation',
        description,
        duration: 10
      }));
    } else {
      window.notification.error({
        message: 'Notation',
        description: 'something went wrong',
        duration: 2
      });
    }
  }
};
