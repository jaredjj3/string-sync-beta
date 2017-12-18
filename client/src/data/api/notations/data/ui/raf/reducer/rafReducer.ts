import rafActions from '../actions';
import { RAFLoop } from 'stringSyncUtil';
import { RAF } from 'types';

const { RESET_RAF_LOOP } = rafActions;

const defaultState: RAF = {
  loop: new RAFLoop()
};

const rafReducer = (state = defaultState, action): RAF => {
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
