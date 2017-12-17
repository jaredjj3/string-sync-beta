import viewportActions from '../actions';
import { getViewport } from 'stringSyncUtil';
import { Viewport } from 'types';

const { SET_VIEWPORT } = viewportActions;

const defaultState: Viewport = Object.freeze(getViewport());

const viewportReducer = (state = defaultState, action): Viewport => {
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
