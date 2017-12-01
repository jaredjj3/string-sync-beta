import { createStore } from 'redux';
import rootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';
import viewportUtil from 'data/ui/viewport/util';

const preLoadedState = {
  session: { currentUser: window.currentUser },
  viewport: viewportUtil.getViewportProps()
};

const store = createStore(
  rootReducer,
  preLoadedState,
  rootMiddleware,
);

window.store = store;
export default store;
