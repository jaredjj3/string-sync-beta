import { SET_VIEWPORT } from './viewportActions';
import { getViewportProps } from './viewportUtils';

const defaultState: any = Object.freeze(getViewportProps());

const viewportReducer = (state = defaultState, action): any => {
  Object.freeze(state);
  const nextState = Object.assign(state, {});

  switch (action.type) {
    case SET_VIEWPORT:
      return action.viewport;

    default:
      return nextState;
  }
};

export default viewportReducer;
