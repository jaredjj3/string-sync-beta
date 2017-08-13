import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';
import getNullUser from 'util/getNullUser';

const preloadedState = {
  session: {
    currentUser: (window as any).currentUser || getNullUser()
  }
};

const store = createStore(
  reducer,
  preloadedState,
  middleware,
);

(window as any).store = store;
export default store;
