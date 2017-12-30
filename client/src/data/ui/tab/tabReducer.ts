
import * as constants from './tabConstants';

const getDefaultState = (): Store.Tab => ({
  instance: null,
  updatedAt: null
});

const defaultState: Store.Tab = Object.freeze(getDefaultState());

const dup = (state: Store.Tab): Store.Tab => Object.assign({}, state);

const tabReducer = (state = defaultState, action): Store.Tab => {
  Object.freeze(state);
  let nextState = dup(state);

  switch (action.type) {
    case constants.SET_TAB:
      nextState.instance = action.tab;
      break;

    case constants.EMIT_UPDATE:
      // effectively updates the updatedAt
      break;

    case constants.RESET_TAB:
      nextState = getDefaultState();
      break;

    default:
      return nextState;
  }

  nextState.updatedAt = Date.now();
  return nextState;
};

export default tabReducer;
