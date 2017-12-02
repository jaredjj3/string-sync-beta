import tabActions from '../actions';
import { Tab } from 'types/tab';

const { SET_PROVIDER, EMIT_UPDATE, RESET_TAB } = tabActions;

const defaultState: Tab = Object.freeze({
  provider: null,
  updatedAt: null
});

const dup = (state: Tab): Tab => Object.assign({}, state);

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
