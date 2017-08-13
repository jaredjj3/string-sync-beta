import { combineReducers } from 'redux';

import device from './device/reducer';
import library from './library/reducer';
import session from './session/reducer';

export default combineReducers({
  device,
  library,
  session,
});
