import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

const store = createStore(
  reducer,
  {},
  middleware,
);

(window as any).store = store;
export default store;
