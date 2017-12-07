import { getNullUser } from 'stringSyncUtil';

const getDefaultState = () => ({
  id: -1,
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
