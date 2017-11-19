import { SET_PROVIDER } from './actions';

const defaultState = Object.freeze({
  provider: null
});

const dup = (state: any): any => Object.assign({}, state);

const TabReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case SET_PROVIDER:
      nextState.provider = action.provider;
      return nextState;

    default:
      return nextState;
  }
};

export default TabReducer;
