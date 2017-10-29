interface VideoPlayer {
  getCurrentTime(): number;
  setPlaybackRate(playbackRate: number): VideoPlayer;
  seekTo(time: number): VideoPlayer;
  playVideo(): VideoPlayer;
  pauseVideo(): VideoPlayer;
  mute(): VideoPlayer;
  unMute(): VideoPlayer;
}

export { VideoPlayer };