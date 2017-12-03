import { User } from './';

export interface Notation extends Object {
  id: number;
  songName: string;
  durationMs: number;
  deadTimeMs: number;
  bpm: number;
  transcriber: User;
  artistName: string;
  thumbnailUrl: string;
  vextabString: string;
  youtubeVideoId?: string;
  tags: Array<string>;
}
