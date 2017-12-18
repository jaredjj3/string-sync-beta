import { combineReducers } from 'redux';

import { viewportReducer as viewport } from './ui/viewport';

const rootReducer = combineReducers({
  viewport
});

export default rootReducer;
