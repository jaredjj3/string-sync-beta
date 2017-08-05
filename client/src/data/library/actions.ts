import * as API from './api';

export const RECEIVE_NOTATIONS = 'RECEIVE_NOTATIONS';

export const receiveNotations = notations => ({
  type: RECEIVE_NOTATIONS,
  notations,
});

export const fetchNotations = () => dispatch => (
  API.fetchNotations().then(notations => dispatch(receiveNotations(notations)))
);
