import sessionActions from '../actions';
import { getNullUser, isLoggedIn } from 'stringSyncUtil';
import dup from './dup';
import { Session } from 'types';

const { SET_USER, RESET_USER } = sessionActions;

// Since the user can't be altered via the sessionReducer, the defaultState
// can be static. This is unlike the relationship between the notation and
// notationReducer.
const defaultState: Session = Object.freeze({
  currentUser: getNullUser(),
  isLoggedIn: false
});

const sessionReducer = (state: Session = defaultState, action) => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case SET_USER:
      nextState.currentUser = action.user;
      nextState.isLoggedIn = isLoggedIn(nextState.currentUser);
      return nextState;

    case RESET_USER:
      return dup(defaultState);

    default:
      return nextState;
  }
};

export default sessionReducer;
