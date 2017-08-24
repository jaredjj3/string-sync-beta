import { BuildStructs } from 'types/buildStructs';
import { ScrollStructs } from 'types/scrollStructs';

export interface Notation {
  id: number;
  name: string;
  duration: number;
  transcriber: string;
  artist: string;
  thumbnailUrl: string;
  tags: Array<string>;
  buildStructs?: BuildStructs;
  scrollStructs?: ScrollStructs;
  youtubeVideoId?: string | number;
}