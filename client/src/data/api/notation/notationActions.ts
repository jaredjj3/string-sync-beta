import * as constants from './notationConstants';
import * as API from './notationApi';
import { camelCaseObjKeys } from 'ssUtil';

export const setNotation = (notation: Store.Notation) => ({
  type: constants.SET_NOTATION,
  notation
});

export const resetNotation = () => ({
  type: constants.RESET_NOTATION
});

// NotationsController#show
export const fetchNotation = (notationId: number) => async dispatch => {
  const notation = await API.fetchNotation(notationId);
  dispatch(setNotation(camelCaseObjKeys(notation, false)));
};

// NotationsController#create
export const createNotation = (payload: Notation) => async dispatch => {
  const notation = await API.createNotation(payload);
  dispatch(setNotation(camelCaseObjKeys(notation, false)));
};

// NotationsController#update
export const updateNotation = (payload: Notation) => async dispatch => {
  const notation = await API.updateNotation(payload);
  dispatch(setNotation(camelCaseObjKeys(notation, false)));
};

// NotationsController#destroy
export const destroyNotation = (notationId: number) => async dispatch => {
  const notation = await API.destroyNotation(notationId);
  dispatch(setNotation(camelCaseObjKeys(notation, false)));
};
