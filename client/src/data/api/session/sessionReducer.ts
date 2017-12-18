import * as constants from './sessionConstants';
import { getNullUser, isLoggedIn } from 'ssUtil';

// Since the user can't be altered via the sessionReducer, the defaultState
// can be static. This is unlike the relationship between the notation and
// notationReducer.
const defaultState: Store.Session = Object.freeze({
  currentUser: getNullUser(),
  isLoggedIn: false
});

const dup = session => {
  const currentUser = Object.assign({}, session.currentUser);
  return Object.assign({}, session, { currentUser });
};

const sessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case constants.SET_USER:
      nextState.currentUser = action.user;
      nextState.isLoggedIn = isLoggedIn(nextState.currentUser);
      return nextState;

    case constants.RESET_USER:
      return dup(defaultState);

    default:
      return nextState;
  }
};

export default sessionReducer;
