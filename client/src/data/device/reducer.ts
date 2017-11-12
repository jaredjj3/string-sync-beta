import { QUERY_DEVICE, UPDATE_VIEWPORT } from './actions';
import { PORTRAIT, LANDSCAPE, DESKTOP, MOBILE } from './constants';

import { Device } from 'types/device';

const defaultState: Device = Object.freeze({
  isTouch: false,
  viewport: { height: 768, width: 1024, orientation: LANDSCAPE},
  type: DESKTOP,
});

export default (state = defaultState, action): Device => {
  Object.freeze(state);
  const nextViewport = Object.assign({}, state.viewport);
  const nextState = Object.assign({}, state, { viewport: nextViewport });

  switch (action.type) {
    case QUERY_DEVICE:
      nextState.isTouch = /iPhone|iPad|iPod|Android|Vita/i.test(navigator.userAgent);
      return nextState;

    case UPDATE_VIEWPORT:
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? LANDSCAPE : PORTRAIT;
      const type = (width < 992 || nextState.isTouch) ? DESKTOP : DESKTOP;
      Object.assign(nextState.viewport, { width, height, orientation });
      Object.assign(nextState, { type });
      return nextState;

    default:
      return nextState;
  }
};
