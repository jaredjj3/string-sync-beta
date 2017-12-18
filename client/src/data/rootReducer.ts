import { combineReducers } from 'redux';

import { viewportReducer as viewport } from './ui/viewport';
import { featuresReducer as features } from './ui/features';

import { sessionReducer as session } from './api/session';

const rootReducer = combineReducers({
  viewport,
  features,
  session
});

export default rootReducer;
