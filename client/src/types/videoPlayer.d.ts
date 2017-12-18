declare interface VideoPlayer {
  getCurrentTime(): number;
  getDuration(): number;
  setPlaybackRate(playbackRate: number): VideoPlayer;
  seekTo(time: number, allowSeekAhead?: boolean): VideoPlayer;
  playVideo(): VideoPlayer;
  pauseVideo(): VideoPlayer;
  mute(): VideoPlayer;
  unMute(): VideoPlayer;
}
