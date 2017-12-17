import API from '../api';
import { ignoreIfExecuting, camelCaseObjKeys } from 'stringSyncUtil';

export const SET_NOTATIONS = 'SET_NOTATIONS';
export const RESET_NOTATIONS = 'RESET_NOTATIONS';

export const setNotations = notations => ({
  type: SET_NOTATIONS,
  notations,
});

export const resetNotations = () => ({
  type: RESET_NOTATIONS
});

// NotationsController#index
export const fetchNotations = () => async dispatch => {
  try {
    const notations = await API.fetchNotations();
    const action = setNotations(notations.map(notation => camelCaseObjKeys(notation, true)));
    dispatch(action);
  } catch (error) {
    window.notification.error({
      message: 'Notations',
      description: error.responseJSON || 'something went wrong'
    });
  }
};
