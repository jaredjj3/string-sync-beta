import tagsActions from '../actions';

const { SET_TAGS, RESET_TAGS } = tagsActions;

const tagsReducer = (state = [], action) => {
  Object.freeze(state);
  const nextState = Object.assign([], state);

  switch (action.type) {
    case SET_TAGS:
      return Object.assign([], action.tags);

    case RESET_TAGS:
      return [];

    default:
      return nextState;
  }
};

export default tagsReducer;
