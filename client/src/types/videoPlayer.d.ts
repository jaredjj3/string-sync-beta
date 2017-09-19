interface VideoPlayer {
  getCurrentTime(): number;
  setPlaybackRate(playbackRate: number): VideoPlayer;
}

export { VideoPlayer };