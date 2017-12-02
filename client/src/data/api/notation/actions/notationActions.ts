import API from '../api';
import { ignoreIfExecuting } from 'stringSyncUtil';
import { Notation } from 'types';

export const RECEIVE_NOTATION = 'RECEIVE_NOTATION';

export const receiveNotation = notation => ({
  type: RECEIVE_NOTATION,
  notation
});

// NotationsController#show
export const fetchNotation = ignoreIfExecuting((notationId: number) => async dispatch => {
  try {
    const notation = await API.fetchNotation(notationId);
    dispatch(receiveNotation(notation));
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
    dispatch(receiveNotation(notation));
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
    dispatch(receiveNotation(notation));
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
    dispatch(receiveNotation(notation));
  } catch (error) {
    window.notification.error({
      message: 'Notation',
      description: error.responseJSON || 'something went wrong'
    });
  }
});
