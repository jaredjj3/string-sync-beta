import * as API from './api';
import getNullUser from 'util/getNullUser';

export const RECEIVE_USER = 'session/RECEIVE_USER';

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

export const login = user => async dispatch => {
  try {
    const currentUser = await API.login(user);
    dispatch(receiveUser(currentUser));

    window.notification.success({
      message: 'Login',
      description: `logged in as @${currentUser.username}`,
      duration: 2
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

export const logout = () => async dispatch => {
  try {
    await API.logout();
    dispatch(receiveUser(getNullUser()));

    window.notification.success({
      message: 'Logout',
      description: 'sucessful',
      duration: 2
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
