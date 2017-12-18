// Used to present a given notation. An example is the library component
// groups presentational notations together. The client doesn't need to
// know about the details of a notation.
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
