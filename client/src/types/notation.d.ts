export interface Notation {
  id: number;
  songName: string;
  duration: number;
  deadTimeMs: number;
  bpm: number;
  transcriber: string;
  artistName: string;
  thumbnailUrl: string;
  vextabString: string;
  youtubeVideoId?: string;
  tags: Array<string>;
}
