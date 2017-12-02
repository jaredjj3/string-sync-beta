import notationActions from '../actions';
import { Notation } from 'types';
import getDefaultState from './getDefaultState';

const { RECEIVE_NOTATION, RESET_NOTATION } = notationActions;

const defaultState: Notation = Object.freeze(getDefaultState());

const notationReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_NOTATION:
      return Object.assign({}, action.notation);

    case RESET_NOTATION:
      return getDefaultState();

    default:
      return nextState;
  }
};

export default notationReducer;
