import { createStore } from 'redux';

import reducer        from './reducer';
import middleware     from './middleware';
import preloadedState from './preloadedState';

const store = createStore(
  reducer,
  preloadedState,
  middleware,
);

(window as any).store = store;
export default store;
