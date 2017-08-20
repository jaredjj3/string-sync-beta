import { BuildStructs } from 'types/buildStructs';
import { ScrollStructs } from 'types/scrollStructs';

export interface Notation {
  id: number,
  name: string,
  transcriber: string,
  artist: string,
  thumbnailUrl: string,
  tags: Array<string>,
  buildStructs?: BuildStructs,
  scrollStructs?: ScrollStructs
}