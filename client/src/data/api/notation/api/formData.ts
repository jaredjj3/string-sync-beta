const formData = (notation) => {
  const {
    songName, artistName, thumbnailFile, youtubeVideoId,
    durationMs, deadTimeMs, bpm, vextabString
  } = notation;

  const data = new FormData();

  if (songName) {
    data.append('notation[song_name]', songName);
  }

  if (artistName) {
    data.append('notation[artist_name]', artistName);
  }

  data.append('notation[vextab_string]', vextabString || '');

  if (youtubeVideoId) {
    data.append('notation[youtube_video_id]', youtubeVideoId);
  }

  data.append('notation[bpm]', (bpm && bpm.toString()) || '120');

  if (typeof deadTimeMs === 'number') {
    data.append('notation[dead_time_ms]', (deadTimeMs && deadTimeMs.toString()) || '0');
  }

  if (durationMs) {
    data.append('notation[duration_ms]', (durationMs && durationMs.toString()) || '0');
  }

  if (thumbnailFile) {
    data.append('notation[thumbnail]', thumbnailFile);
  }

  return data;
};

export default formData;
