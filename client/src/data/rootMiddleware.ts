import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const rootMiddleware = applyMiddleware(
  thunk
);

export default rootMiddleware;
