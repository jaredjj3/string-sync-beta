import { RECEIVE_NOTATIONS } from './actions';
import { Notation } from 'types/notation';

import dup from 'util/dup/library';

export interface Library {
  notations: Array<Notation>
}

const defaultState: Library = Object.freeze({
  notations: [],
});

export default (state = defaultState, action): Library => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case RECEIVE_NOTATIONS:
      nextState.notations = action.notations;
      return nextState;

    default:
      return nextState;
  }
};
