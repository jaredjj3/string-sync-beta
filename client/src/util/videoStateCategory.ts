const videoStateCategory = (videoState: string): string => {
  return (videoState === 'PLAYING' || videoState === 'BUFFERING') ? 'ACTIVE' : 'PASSIVE';
};

export default videoStateCategory;
