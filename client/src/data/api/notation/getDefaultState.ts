import { getNullUser } from 'utilities';

const getDefaultState = () => ({
  id: -1,
  createdAt: 'Janurary 01, 1900',
  songName: '',
  durationMs: 0,
  deadTimeMs: 0,
  bpm: 0,
  transcriber: getNullUser(),
  artistName: '',
  thumbnailUrl: '',
  vextabString: '',
  youtubeVideoId: '',
  tags: []
});

export default getDefaultState;
