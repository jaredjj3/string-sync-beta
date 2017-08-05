import { combineReducers } from 'redux';

import device from './device/reducer';
import library from './library/reducer';

export default combineReducers({
  device,
  library
});
