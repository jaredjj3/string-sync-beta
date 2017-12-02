declare interface Transcriber {
  id: number;
  username: string;
  email: string;
}

declare interface PresentationalNotation {
  id: number;
  songName: string;
  durationMs: number;
  artistName: string;
  thumbnailUrl: string;
  tags: Array<string>;
  transcriber: Transcriber;
  featured?: boolean;
}

export type Notations = Array<PresentationalNotation>;
