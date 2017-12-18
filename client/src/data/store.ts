import { createStore } from 'redux';
import { getViewport, isLoggedIn } from 'ssUtil';
import rootReducer from './rootReducer';
import rootMiddleware from './rootMiddleware';

const preLoadedState = {
  // session: {
  //   currentUser: window.currentUser,
  //   isLoggedIn: isLoggedIn(window.currentUser)
  // },
  viewport: getViewport()
};

const store = createStore(
  rootReducer,
  preLoadedState,
  rootMiddleware
);

window.store = store;
export default store;
