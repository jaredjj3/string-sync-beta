import * as API from './notationsApi';
import dupNotation from 'util/dup/notation';

export const RECEIVE_NOTATION = 'RECEIVE_NOTATION';
export const UPDATE_VEXTAB = 'UPDATE_VEXTAB';
export const RESET_NOTATION = 'RESET_NOTATION';

export const receiveNotation = notation => ({
  type: RECEIVE_NOTATION,
  notation,
});

export const updateVextab = (vextab: string) => ({
  type: UPDATE_VEXTAB,
  vextab
});

export const resetNotation = () => ({
  type: RESET_NOTATION
});

export const fetchNotation = (() => {
  let isFetching = false;

  return (notationId: number) => async dispatch => {
    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const notation = await API.fetchNotation(notationId);
      dispatch(receiveNotation(notation));
    } catch (e) {
      console.error(e);
    } finally {
      isFetching = false;
    }
  };
})();

export const updateNotation = (notation = null) => async (dispatch, getState) => {
  const updateWithNotation = dupNotation(notation || getState().notation);
  try {
    const updatedNotation = await API.updateNotation(updateWithNotation);

    window.notification.success({
      message: 'Notation',
      description: 'update successful',
      duration: 2
    });

    dispatch(receiveNotation(updatedNotation));
  } catch ({ responseJSON }) {
    const { messages } = responseJSON;
    if (messages) {
      messages.forEach(description => window.notification.error({
        message: 'Notation',
        description,
        duration: 2
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

export const createNotation = (notation) => async dispatch => {
  try {
    const createdNotation = await API.createNotation(notation);
    dispatch(receiveNotation(createdNotation));

    window.notification.success({
      message: 'Notation',
      description: 'create successful',
      duration: 2
    });

  } catch ({ responseJSON }) {
    const { messages } = responseJSON;
    if (messages) {
      messages.forEach(description => window.notification.error({
        message: 'Notation',
        description,
        duration: 2
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
