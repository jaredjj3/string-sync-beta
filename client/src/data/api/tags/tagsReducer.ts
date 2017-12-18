import * as constants from './tagsConstants';

const dup = tags => tags.map(tag => Object.assign({}, tag));

const tagsReducer = (state = [], action): Store.Tags => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case constants.SET_TAGS:
      return dup(action.tags);

    case constants.RESET_TAGS:
      return [];

    default:
      return nextState;
  }
};

export default tagsReducer;
