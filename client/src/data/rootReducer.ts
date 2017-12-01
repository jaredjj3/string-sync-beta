import { combineReducers } from 'redux';

import { notationReducer as notation } from './api/notation';
import { notationsReducer as notations } from './api/notations';
import { sessionReducer as session } from './api/session';
import { tagsReducer as tags } from './api/tags';
import { userNotationReducer as userNotation } from './api/userNotation';
import { userReducer as user } from './api/user';

import { behaviorsReducer as behaviors } from './ui/behaviors';
import { featuresReducer as features } from './ui/features';
import { rafReducer as raf } from './ui/raf';
import { tabReducer as tab } from './ui/tab';
import { videoReducer as video } from './ui/video';
import { viewportReducer as viewport } from './ui/viewport';

const rootReducer = combineReducers({
  notation,
  notations,
  session,
  tags,
  userNotation,
  user,
  behaviors,
  features,
  raf,
  tab,
  video,
  viewport
});

export default rootReducer;
