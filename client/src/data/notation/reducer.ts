import { RECEIVE_NOTATION } from './actions';
import { Notation } from 'types/notation';

import dup from 'util/dup/notation';

const defaultState: Notation = Object.freeze({
  id: -1,
  name: '',
  transcriber: '',
  artist: '',
  thumbnailUrl: '',
  tags: [],
  buildStructs: { measures: [] },
  scrollStructs: [],
  youtubeVideoId: ''
});

const process = (notation: any): Notation => {
  notation.buildStructs = JSON.parse(notation.buildStructs);
  notation.scrollStructs = JSON.parse(notation.scrollStructs);

  return notation;
};

export default (state = defaultState, action): Notation => {
  Object.freeze(state);
  const nextState = dup(state);

  switch (action.type) {
    case RECEIVE_NOTATION:
      return process(action.notation);

    default:
      return nextState;
  }
};
