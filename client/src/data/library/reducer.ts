import { RECEIVE_NOTATIONS } from './actions';

import dup from 'util/dup/library';

export interface Notation {
  id: number,
  name: string,
  transcriber: string,
  artist: string,
  thumbnailUrl: string,
  tags: Array<string>
}

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
