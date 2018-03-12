import * as constants from './viewportConstants';
import { getViewport } from 'utilities';

const defaultState: Store.Viewport = Object.freeze(getViewport());

const viewportReducer = (state = defaultState, action): Store.Viewport => {
  Object.freeze(state);
  const nextState = Object.assign(state, {});

  switch (action.type) {
    case constants.SET_VIEWPORT:
      return Object.assign({}, action.viewport);

    default:
      return nextState;
  }
};

export default viewportReducer;
