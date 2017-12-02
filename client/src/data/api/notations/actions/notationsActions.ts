import API from '../api';
import { ignoreIfExecuting, camelCaseObjKeys } from 'stringSyncUtil';

export const RECEIVE_NOTATIONS = 'RECEIVE_NOTATIONS';
export const RESET_NOTATIONS = 'RESET_NOTATIONS';

export const receiveNotations = notations => ({
  type: RECEIVE_NOTATIONS,
  notations,
});

export const resetNotations = () => ({
  type: RESET_NOTATIONS
});

//
export const fetchNotations = ignoreIfExecuting(() => async dispatch => {
  try {
    const notations = await API.fetchNotations();
    dispatch(receiveNotations(camelCaseObjKeys(notations, true)));
  } catch (error) {
    window.notification.error({
      message: 'Notations',
      description: error.responseJSON || 'something went wrong'
    });
  }
});
