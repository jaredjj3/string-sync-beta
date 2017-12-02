import rafActions from '../actions';
import { RAFLoop } from 'stringSyncUtil';

const { RESET_RAF_LOOP } = rafActions;

interface StoreRAF {
  loop: RAFLoop;
}

const defaultState: StoreRAF = {
  loop: new RAFLoop()
};

const rafReducer = (state = defaultState, action): StoreRAF => {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RESET_RAF_LOOP:
      nextState.loop = new RAFLoop();
      return nextState;

    default:
      return nextState;
  }
};

export default rafReducer;
