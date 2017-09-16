import * as API from './api';
import { Notation } from 'types/notation';

export const RECEIVE_NOTATIONS = 'RECEIVE_NOTATIONS';

export const receiveNotations = (notations: Array<Notation>) => ({
  type: RECEIVE_NOTATIONS,
  notations,
});

export const fetchNotations = (() => {
  let isFetching = false;

  // TODO: Investigate why the Search component would unmount on initial
  // load, causing this AJAX request to be called twice erroneously.
  // There's a chance it's related to the dev environment.
  return (filters = { featured: null }) => async dispatch => {
    const { notifyAll } = window as any;

    if (isFetching) {
      return;
    }

    isFetching = true;

    try {
      const notations = await API.fetchNotations(filters);
      dispatch(receiveNotations(notations));
    } catch ({ responseJSON }) {
      notifyAll('Library', responseJSON);
    } finally {
      isFetching = false;
    }
  };
})();
