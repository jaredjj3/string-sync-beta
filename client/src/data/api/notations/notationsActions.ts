import * as API from './notationsApi';
import * as constants from './notationsConstants';
import { camelCaseObjKeys } from 'utilities';

export const setNotations = (notations: Store.Notations) => ({
  type: constants.SET_NOTATIONS,
  notations,
});

export const resetNotations = () => ({
  type: constants.RESET_NOTATIONS
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
