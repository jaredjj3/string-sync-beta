import { combineReducers } from 'redux';

import { reducer as viewport } from './viewport';
import library from './library/reducer';
import session from './session/reducer';
import notation from './notation/reducer';
import video from './video/reducer';
import feature from './feature/reducer';
import behavior from './behavior/reducer';
import tab from './tab/reducer';
import panels from './panels/reducer';
import tags from './tags/reducer';
import raf from './raf/reducer';

const rootReducer = combineReducers({
  viewport,
  library,
  session,
  notation,
  video,
  feature,
  behavior,
  tab,
  panels,
  tags,
  raf
});

export default rootReducer;
