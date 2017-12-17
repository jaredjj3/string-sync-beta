const videoStateCategory = (videoState: string): string => {
  return (videoState === 'PLAYING' || videoState === 'BUFFERING') ? 'ACTIVE' : 'PASSIVE';
};

const isVideoActive = (videoState: string): boolean => {
  return videoStateCategory(videoState) === 'ACTIVE';
};

export default isVideoActive;
