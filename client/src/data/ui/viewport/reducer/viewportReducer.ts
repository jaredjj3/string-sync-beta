import viewportActions from '../actions';
import { getViewport } from 'stringSyncUtil';

const { SET_VIEWPORT } = viewportActions;

const defaultState: any = Object.freeze(getViewport());

const viewportReducer = (state = defaultState, action): any => {
  Object.freeze(state);
  const nextState = Object.assign(state, {});

  switch (action.type) {
    case SET_VIEWPORT:
      return Object.assign({}, action.viewport);

    default:
      return nextState;
  }
};

export default viewportReducer;
