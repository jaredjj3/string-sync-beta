import { combineReducers } from 'redux';

import device from './device/reducer';
import library from './library/reducer';
import session from './session/reducer';
import notation from './notation/reducer';

export default combineReducers({
  device,
  library,
  session,
  notation,
});
