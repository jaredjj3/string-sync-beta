import { SET_PROVIDER, EMIT_UPDATE, RESET_TAB } from './actions';

const defaultState = Object.freeze({
  provider: null,
  updatedAt: null
});

const dup = (state: any): any => Object.assign({}, state);

const TabReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let nextState = dup(state);

  switch (action.type) {
    case SET_PROVIDER:
      nextState.provider = action.provider;
      break;

    // effectively updates the updatedAt
    case EMIT_UPDATE:
      break;

    case RESET_TAB:
      nextState = dup(defaultState);
      break;

    default:
      return nextState;
  }

  nextState.updatedAt = Date.now();
  return nextState;
};

export default TabReducer;
