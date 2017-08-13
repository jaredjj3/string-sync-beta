import { RECEIVE_USER } from './actions';
import { User } from 'types/user';

import getNullUser from 'util/getNullUser';
import dupUser from 'util/dup/user';

export interface Session {
  currentUser: User;
}

const defaultState: Session = Object.freeze(
  Object.assign(
    { currentUser: getNullUser() },
    { currentUser: (window as any).currentUser }
  )
);

const dup = (state: Session): Session => {
  const currentUser = dupUser(state.currentUser);
  return Object.assign({}, state, { currentUser });
};

export default (state = defaultState, action): Session => {
  Object.freeze(state);
  const nextState = dup(state);
  console.log('action ', action.type);
  console.log(JSON.stringify(nextState));
  console.log('\n')

  switch (action.type) {
    case RECEIVE_USER:
      nextState.currentUser = action.user;
      return nextState;

    default:
      return nextState;
  }
};
