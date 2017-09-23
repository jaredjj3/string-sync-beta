import { combineReducers } from 'redux';

import device from './device/reducer';
import library from './library/reducer';
import session from './session/reducer';
import notation from './notation/reducer';
import video from './video/reducer';
import feature from './feature/reducer';
import behavior from './behavior/reducer';
import tab from './tab/reducer';
import panels from './panels/reducer';
import tags from './tags/reducer';
import tuning from './tuning/reducer';

export default combineReducers({
  device,
  library,
  session,
  notation,
  video,
  feature,
  behavior,
  tab,
  panels,
  tags,
  tuning,
});
