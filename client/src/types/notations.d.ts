import { Tag } from './';

interface Transcriber {
  id: number;
  username: string;
  email: string;
}

interface PresentationalNotation {
  id: number;
  songName: string;
  durationMs: number;
  artistName: string;
  thumbnailUrl: string;
  tags: Array<Tag>;
  transcriber: Transcriber;
  featured?: boolean;
}

export type Notations = Array<PresentationalNotation>;