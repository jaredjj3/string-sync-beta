import tagsActions from '../actions';
import dup from './dup';

const { SET_TAGS, RESET_TAGS } = tagsActions;

const tagsReducer = (state = [], action) => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case SET_TAGS:
      return dup(action.tags);

    case RESET_TAGS:
      return [];

    default:
      return nextState;
  }
};

export default tagsReducer;
