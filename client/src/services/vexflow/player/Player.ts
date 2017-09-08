import { VideoPlayer } from 'types/videoPlayer';
import Artist from '../artist';

class Player {
  videoPlayer: VideoPlayer = null;
  artist: Artist = null;

  constructor(videoPlayer: VideoPlayer) {
    this.videoPlayer = videoPlayer;
  }
}

export default Player;
