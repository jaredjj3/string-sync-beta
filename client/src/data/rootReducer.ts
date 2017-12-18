import { combineReducers } from 'redux';

import { viewportReducer as viewport } from './ui/viewport';

import { sessionReducer as session } from './api/session';

const rootReducer = combineReducers({
  viewport,
  session
});

export default rootReducer;
