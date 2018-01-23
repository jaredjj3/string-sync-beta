import * as constants from './videoConstants';

export const setPlayer = player => ({
  type: constants.SET_PLAYER,
  player
});

export const setPlayerState = playerState => ({
  type: constants.SET_PLAYER_STATE,
  playerState
});

export const resetVideo = () => ({
  type: constants.RESET_VIDEO
});
