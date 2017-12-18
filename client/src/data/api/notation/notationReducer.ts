import * as constants from './notationConstants';
import getDefaultState from './getDefaultState';

const defaultState: Store.Notation = Object.freeze(getDefaultState());

const notationReducer = (state= defaultState, action): Store.Notation => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case constants.SET_NOTATION:
      return Object.assign({}, action.notation);

    case constants.RESET_NOTATION:
      return getDefaultState();

    default:
      return nextState;
  }
};

export default notationReducer;
