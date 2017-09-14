import { RECEIVE_TAGS } from './actions';

import { Tag } from 'types/tag';

declare type StoreTags = Array<Tag>;

export default (state = [], action): StoreTags => {
  Object.freeze(state);
  const nextState = state.map(tag => Object.assign(tag));

  switch (action.type) {
    case RECEIVE_TAGS:
      return action.tags;

    default:
      return nextState;
  }
};
