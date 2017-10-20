import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

const preLoadedState = {
  session: { currentUser: window.currentUser }
};

const store = createStore(
  reducer,
  preLoadedState,
  middleware,
);

window.store = store;
export default store;
