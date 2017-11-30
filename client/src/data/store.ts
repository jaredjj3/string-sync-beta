import { createStore } from 'redux';

import rootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';

import { utils as viewportUtils } from 'data/viewport';

const preLoadedState = {
  session: { currentUser: window.currentUser },
  viewport: viewportUtils.getViewportProps()
};

const store = createStore(
  rootReducer,
  preLoadedState,
  rootMiddleware,
);

window.store = store;
export default store;
