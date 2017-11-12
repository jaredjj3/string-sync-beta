import {
  UPDATE_VIDEO_PLAYER,
  UPDATE_VIDEO_STATE,
  UPDATE_VIDEO_LOOP,
  RESET_VIDEO
} from './actions';

import { withNegativeTimeDeltaGuard } from 'util/withNegativeTimeDeltaGuard';

interface Video {
  player: any;
  state: string;
  loop: Array<number>;
}

const defaultState: Video = Object.freeze({
  player: null,
  state: '',
  loop: [0, Number.MAX_SAFE_INTEGER]
});

export default (state = defaultState, action) => {
  Object.freeze(state);
  const loop = Object.assign([], state.loop);
  const nextState = Object.assign({}, state, { loop });

  switch (action.type) {
    case UPDATE_VIDEO_PLAYER:
      nextState.player = withNegativeTimeDeltaGuard(action.videoPlayer);
      return nextState;

    case UPDATE_VIDEO_STATE:
      nextState.state = action.videoState;
      return nextState;

    case UPDATE_VIDEO_LOOP:
      nextState.loop = action.loop;
      return nextState;

    case RESET_VIDEO:
      return defaultState;

    default:
      return nextState;
  }
};
