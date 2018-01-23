import * as constants from './videoConstants';
import { isVideoActive, elvis } from 'ssUtil';

const getDefaultState = (): Store.Video => ({
  player: null,
  playerState: '',
  isActive: false
});

const defaultState: Store.Video = Object.freeze(getDefaultState());

export default (state = defaultState, action): Store.Video => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case constants.SET_PLAYER:
      nextState.player = action.player;
      return nextState;

    case constants.SET_PLAYER_STATE:
      nextState.playerState = action.playerState;
      nextState.isActive = isVideoActive(action.playerState);
      return nextState;

    case constants.RESET_VIDEO:
      return Object.assign({}, defaultState);

    default:
      return nextState;
  }
};
