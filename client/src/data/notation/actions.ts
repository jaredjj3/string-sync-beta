import * as API from './api';
import { Notation } from 'types/notation';
import dupNotation from 'util/dup/notation';

export const RECEIVE_NOTATION = 'RECEIVE_NOTATION';
export const UPDATE_VEXTAB = 'UPDATE_VEXTAB';

export const receiveNotation = (notation: Notation) => ({
  type: RECEIVE_NOTATION,
  notation,
});

export const updateVextab = (vextab: string) => ({
  type: UPDATE_VEXTAB,
  vextab
});

// TODO: make a higher order function that produces this behavior.
export const fetchNotation = (() => {
  const { notifyAll, notify } = window as any;
  let isFetching = false;

  return (notationId: number) => async dispatch => {
    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const notation = await API.fetchNotation(notationId);
      dispatch(receiveNotation(notation));
    } catch ({ responseJSON }) {
      notifyAll('Notation', responseJSON);
    } finally {
      isFetching = false;
    }
  };
})();

export const updateNotation = () => async (dispatch, getState) => {
  const { notifyAll, notify } = window as any;
  const updateWithNotation = dupNotation(getState().notation);

  try {
    const notation = await API.updateNotation(updateWithNotation);
    notify('Notation', 'update successful', { type: 'success', duration: 2 });

    dispatch(receiveNotation(notation));
  } catch ({ responseJSON }) {
    if (responseJSON) {
      notifyAll('Notation', responseJSON);
    }
  }
};

export const createNotation = (notation) => async dispatch => {
  const { notifyAll, notify } = window as any;

  try {
    const createdNotation = await API.createNotation(notation);
    dispatch(receiveNotation(createdNotation));
    notify('Notation', 'create successful', { type: 'success', duration: 2 });
  } catch ({ responseJSON }) {
    if (responseJSON) {
      notifyAll('Notation', responseJSON);
    }
  }
};
