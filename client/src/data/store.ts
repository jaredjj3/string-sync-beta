import { createStore } from 'redux';

import reducer from './reducer';
import middleware from './middleware';

const isTouch = /iPhone|iPad|iPod|Android|Vita/i.test(navigator.userAgent);
const width = window.innerWidth;
const height = window.innerHeight;
const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
const type = (width < 992 || isTouch) ? 'MOBILE' : 'DESKTOP';

const preLoadedState = {
  session: { currentUser: window.currentUser },
  device: {
    viewport: { height, width, orientation },
    type,
    isTouch
  }
};

const store = createStore(
  reducer,
  preLoadedState,
  middleware,
);

window.store = store;
export default store;
