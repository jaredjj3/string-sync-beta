export const UPDATE_VIDEO_PLAYER = 'UPDATE_VIDEO_PLAYER';
export const UPDATE_VIDEO_STATE = 'UPDATE_VIDEO_STATE';
export const UPDATE_VIDEO_LOOP = 'UPDATE_VIDEO_LOOP';
export const RESET_VIDEO = 'RESET_VIDEO';

export const updateVideoPlayer = videoPlayer => ({
  type: UPDATE_VIDEO_PLAYER,
  videoPlayer
});

export const updateVideoState = videoState => ({
  type: UPDATE_VIDEO_STATE,
  videoState
});

export const updateLoop = loop => ({
  type: UPDATE_VIDEO_LOOP,
  loop
});

export const resetVideo = () => ({
  type: RESET_VIDEO
});
