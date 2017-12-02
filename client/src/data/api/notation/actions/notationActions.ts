import API from '../api';
import { Notation } from 'types';
import { ignoreIfExecuting, camelCaseObjKeys } from 'stringSyncUtil';

export const RECEIVE_NOTATION = 'RECEIVE_NOTATION';
export const RESET_NOTATION = 'RESET_NOTATION';

export const receiveNotation = (notation: Notation) => ({
  type: RECEIVE_NOTATION,
  notation
});

export const resetNotation = () => ({
  type: RESET_NOTATION
});

// NotationsController#show
export const fetchNotation = ignoreIfExecuting((notationId: number) => async dispatch => {
  try {
    const notation = await API.fetchNotation(notationId);
    dispatch(receiveNotation(camelCaseObjKeys(notation, false)));
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
});

// NotationsController#create
export const createNotation = ignoreIfExecuting((payload: Notation) => async dispatch => {
  try {
    const notation = await API.createNotation(payload);
    dispatch(receiveNotation(camelCaseObjKeys(notation, false)));

    window.notification.success({
      message: 'Notation',
      description: 'create successful',
      duration: 2
    });
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
});

// NotationsController#update
export const updateNotation = ignoreIfExecuting((payload: Notation) => async dispatch => {
  try {
    const notation = await API.updateNotation(payload);
    dispatch(receiveNotation(camelCaseObjKeys(notation, false)));

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
});

// NotationsController#destroy
export const destroyNotation = ignoreIfExecuting((notationId: number) => async dispatch => {
  try {
    const notation = await API.destroyNotation(notationId);
    dispatch(receiveNotation(camelCaseObjKeys(notation, false)));

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
});
