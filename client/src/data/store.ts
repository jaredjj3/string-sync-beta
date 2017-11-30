import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

import { utils as viewportUtils } from 'data/viewport';

const preLoadedState = {
  session: { currentUser: window.currentUser },
  viewport: viewportUtils.getViewportProps()
};

const store = createStore(
  reducer,
  preLoadedState,
  middleware,
);

window.store = store;
export default store;
