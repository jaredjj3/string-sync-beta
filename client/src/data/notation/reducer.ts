import { RECEIVE_NOTATION, UPDATE_VEXTAB } from './actions';
import { Notation } from 'types/notation';

import dup from 'util/dup/notation';

const defaultState: Notation = Object.freeze({
  id: -1,
  name: '',
  transcriber: '',
  artist: '',
  thumbnailUrl: '',
  tags: [],
  vextab: '',
  youtubeVideoId: '',
  duration: 0,
  deadTime: 0
});

export default (state = defaultState, action): Notation => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case RECEIVE_NOTATION:
      return dup(action.notation);

    case UPDATE_VEXTAB:
      nextState.vextab = action.vextab;
      return nextState;

    default:
      return nextState;
  }
};
