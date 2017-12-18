export const SET_PLAYER = 'SET_VIDEO_PLAYER';
export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';
export const SET_LOOP = 'SET_LOOP';
export const RESET_VIDEO = 'RESET_VIDEO';

export const setPlayer = player => ({
  type: SET_PLAYER,
  player
});

export const setPlayerState = playerState => ({
  type: SET_PLAYER_STATE,
  playerState
});

export const setLoop = (loop: [number, number]) => ({
  type: SET_LOOP,
  loop
});

export const resetVideo = () => ({
  type: RESET_VIDEO
});
