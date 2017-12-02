import { createStore } from 'redux';
import rootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';
import { getViewport } from 'stringSyncUtil';

const preLoadedState = {
  session: { currentUser: window.currentUser },
  viewport: getViewport()
};

const store = createStore(
  rootReducer,
  preLoadedState,
  rootMiddleware,
);

window.store = store;
export default store;
