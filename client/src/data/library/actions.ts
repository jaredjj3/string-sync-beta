import * as API from './api';

export const RECEIVE_ALL_NOTATIONS = 'RECEIVE_ALL_NOTATIONS';

export const receiveAllNotations = notations => ({
  type: RECEIVE_ALL_NOTATIONS,
  notations,
});

export const fetchAllNotations = () => dispatch => (
  API.fetchAllNotations().then(notations => dispatch(receiveAllNotations(notations)))
);
