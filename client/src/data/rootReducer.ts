import { combineReducers } from 'redux';

// The API reducers correspond nearly 1-to-1 with the StringSync backend API.
// Even though the data are used in the UI, these reducers are classified as
// API because they couple with some external service.
import { notationReducer as notation } from './api/notation';
import { notationsReducer as notations } from './api/notations';
import { sessionReducer as session } from './api/session';
import { tagsReducer as tags } from './api/tags';
import { userNotationReducer as userNotation } from './api/userNotation';

// The UI reducers manage data that is purely concerned with the client side.
// However, data managed here may originate from an API, but these reducers
// must not be the "first pass" managers of such data.
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
  behaviors,
  features,
  raf,
  tab,
  video,
  viewport
});

export default rootReducer;
