import notationActions from '../actions';
import dup from './dup';

const { SET_NOTATIONS, RESET_NOTATIONS } = notationActions;

const notationsReducer = (state = [], action) => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case SET_NOTATIONS:
      return dup(action.notations);

    case RESET_NOTATIONS:
      return [];

    default:
      return nextState;
  }
};

export default notationsReducer;
