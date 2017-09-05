import { UPDATE_VIDEO_PLAYER, UPDATE_VIDEO_STATE } from './actions';
import { withNegativeTimeDeltaGuard } from 'util/withNegativeTimeDeltaGuard';

interface Video {
  player: any;
  state: string;
}

const defaultState: Video = Object.freeze({
  player: null,
  state: ''
});

export default (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case UPDATE_VIDEO_PLAYER:
      nextState.player = withNegativeTimeDeltaGuard(action.videoPlayer);
      return nextState;

    case UPDATE_VIDEO_STATE:
      nextState.state = action.videoState;
      return nextState;

    default:
      return nextState;
  }
};
