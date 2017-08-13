import { BuildStructs } from 'types/buildStructs';

export interface Notation {
  id: number,
  name: string,
  transcriber: string,
  artist: string,
  thumbnailUrl: string,
  tags: Array<string>,
  buildStructs?: BuildStructs
}