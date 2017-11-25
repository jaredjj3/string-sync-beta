interface VideoPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  setPlaybackRate(playbackRate: number): VideoPlayer;
  seekTo(time: number): VideoPlayer;
  playVideo(): VideoPlayer;
  pauseVideo(): VideoPlayer;
  mute(): VideoPlayer;
  unMute(): VideoPlayer;
}

export { VideoPlayer };