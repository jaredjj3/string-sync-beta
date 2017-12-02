const videoStateCategory = (videoState: string): string => {
  return (videoState === 'PLAYING' || videoState === 'BUFFERING') ? 'ACTIVE' : 'PASSIVE';
};

export const isVideoActive = (videoState: string): boolean => {
  return videoStateCategory(videoState) === 'ACTIVE';
};

export const isVideoPassive = (videoState: string): boolean => {
  return videoStateCategory(videoState) === 'PASSIVE';
};

export default videoStateCategory;
