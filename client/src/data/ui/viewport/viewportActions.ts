import * as constants from './viewportConstants';

export const setViewport = viewport => ({
  type: constants.SET_VIEWPORT,
  viewport
});
