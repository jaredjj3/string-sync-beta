import * as constants from './notationsConstants';
import { merge } from 'lodash';

const dup = notations => notations.map(notation => merge({}, notation));

const notationsReducer = (state = [], action): Store.Notations => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case constants.SET_NOTATIONS:
      return dup(action.notations);

    case constants.RESET_NOTATIONS:
      return [];

    default:
      return nextState;
  }
};

export default notationsReducer;
