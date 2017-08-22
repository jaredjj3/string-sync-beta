export const UPDATE_VIDEO_PLAYER = 'UPDATE_VIDEO_PLAYER';
export const UPDATE_VIDEO_STATE = 'UPDATE_VIDEO_STATE';

export const updateVideoPlayer = videoPlayer => ({
  type: UPDATE_VIDEO_PLAYER,
  videoPlayer
});

export const updateVideoState = videoState => ({
  type: UPDATE_VIDEO_STATE,
  videoState
});
