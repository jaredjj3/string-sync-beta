import API from '../api';
import { Notation } from 'types';
import { camelCaseObjKeys } from 'stringSyncUtil';

export const SET_NOTATION = 'SET_NOTATION';
export const RESET_NOTATION = 'RESET_NOTATION';

export const setNotation = (notation: Notation) => ({
  type: SET_NOTATION,
  notation
});

export const resetNotation = () => ({
  type: RESET_NOTATION
});

// NotationsController#show
export const fetchNotation = (notationId: number) => async dispatch => {
  try {
    const notation = await API.fetchNotation(notationId);
    dispatch(setNotation(camelCaseObjKeys(notation, false)));
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
};

// NotationsController#create
export const createNotation = (payload: Notation) => async dispatch => {
  try {
    const notation = await API.createNotation(payload);
    dispatch(setNotation(camelCaseObjKeys(notation, false)));

    window.notification.success({
      message: 'Notation',
      description: 'create successful',
      duration: 2
    });
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || error.message || 'something went wrong'
    });
  }
};

// NotationsController#update
export const updateNotation = (payload: Notation) => async dispatch => {
  try {
    const notation = await API.updateNotation(payload);
    dispatch(setNotation(camelCaseObjKeys(notation, false)));

    window.notification.success({
      message: 'Notation',
      description: 'update successful',
      duration: 2
    });
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
};

// NotationsController#destroy
export const destroyNotation = (notationId: number) => async dispatch => {
  try {
    const notation = await API.destroyNotation(notationId);
    dispatch(setNotation(camelCaseObjKeys(notation, false)));

    window.notification.success({
      message: 'Notation',
      description: 'destroy successful',
      duration: 2
    });
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
};
