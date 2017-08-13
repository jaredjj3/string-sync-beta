import { RECEIVE_USER } from './actions';
import { User } from 'types/user';

import getNullUser from 'util/getNullUser';
import dupUser from 'util/dup/user';

export interface Session {
  currentUser: User;
}

const defaultState: Session = Object.freeze({ currentUser: getNullUser() });

const dup = (state: Session): Session => {
  const currentUser = dupUser(state.currentUser);
  return Object.assign({}, state, { currentUser });
};

export default (state = defaultState, action): Session => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case RECEIVE_USER:
      nextState.currentUser = action.user;
      return nextState;

    default:
      return nextState;
  }
};
