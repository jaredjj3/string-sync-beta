
import { ScrollStructs } from 'types/scrollStructs';

export interface Notation {
  id: number;
  name: string;
  duration: number;
  deadTime: number;
  transcriber: string;
  artist: string;
  thumbnailUrl: string;
  tags: Array<string>;
  vextab: string;
  youtubeVideoId?: string | number;
}