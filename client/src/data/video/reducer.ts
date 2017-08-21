import { SET_VIDEO_PLAYER } from './actions';

interface Video {
  player: any;
}

const defaultState: Video = Object.freeze({
  player: null
});

export default (state = defaultState, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case SET_VIDEO_PLAYER:
      nextState.player = action.videoPlayer;
      return nextState;

    default:
      return nextState;
  }
};
