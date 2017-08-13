import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

const preLoadedState = {
  session: {
    currentUser: (window as any).currentUser
  }
};

const store = createStore(
  reducer,
  preLoadedState,
  middleware,
);

(window as any).store = store;
export default store;
