export const SET_VIDEO_PLAYER = 'SET_VIDEO_PLAYER';
export const SET_VIDEO_STATE = 'SET_VIDEO_STATE';
export const SET_VIDEO_LOOP = 'SET_VIDEO_LOOP';
export const RESET_VIDEO = 'RESET_VIDEO';

export const setVideoPlayer = videoPlayer => ({
  type: SET_VIDEO_PLAYER,
  videoPlayer
});

export const setVideoState = videoState => ({
  type: SET_VIDEO_STATE,
  videoState
});

export const setVideoLoop = (loop: [number, number]) => ({
  type: SET_VIDEO_LOOP,
  loop
});

export const resetVideo = () => ({
  type: RESET_VIDEO
});
