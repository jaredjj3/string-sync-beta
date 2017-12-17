import { VideoPlayer } from 'types';

export interface Video {
  player: VideoPlayer;
  playerState: string;
  isActive: boolean;
  loop: Array<number>;
}
