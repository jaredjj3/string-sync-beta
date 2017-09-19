interface VideoPlayer {
  getCurrentTime(): number;
  setPlaybackRate(playbackRate: number): VideoPlayer;
  seekTo(time: number): VideoPlayer;
  playVideo(): VideoPlayer;
  pauseVideo(): VideoPlayer;
}

export { VideoPlayer };