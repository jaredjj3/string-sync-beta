
import * as constants from './tabConstants';

const getDefaultState = (): Store.Tab => ({
  instance: null,
  updatedAt: Date.now()
});

const defaultState: Store.Tab = Object.freeze(getDefaultState());

const dup = (state: Store.Tab): Store.Tab => Object.assign({}, state);

const tabReducer = (state = defaultState, action): Store.Tab => {
  Object.freeze(state);
  let nextState = dup(state);

  switch (action.type) {
    case constants.SET_TAB:
      nextState.instance = action.tab;
      nextState.updatedAt = Date.now();
      return nextState;

    case constants.EMIT_TAB_UPDATE:
      nextState.updatedAt = Date.now();
      return nextState;

    case constants.RESET_TAB:
      return getDefaultState();

    default:
      return nextState;
  }
};

export default tabReducer;
