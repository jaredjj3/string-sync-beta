import sessionActions from '../actions';
import { getNullUser } from 'stringSyncUtil';

const { SET_USER, RESET_USER } = sessionActions;

// Since the user can't be altered via the sessionReducer, the defaultState
// can be static. This is unlike the relationship between the notation and
// notationReducer.
const defaultState = Object.freeze(getNullUser());

const sessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case SET_USER:
      return Object.assign({}, action.user);

    case RESET_USER:
      return getNullUser();

    default:
      return nextState;
  }
};

export default sessionReducer;
