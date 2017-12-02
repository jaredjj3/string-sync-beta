const formData = (notation) => {
  const {
    name, artistName, thumbnailFile, youtubeVideoId, tagIds,
    duration, deadTime, tempo, featured, vextab
  } = notation;

  const data = new FormData();

  if (name) {
    data.append('notation[name]', name);
  }

  if (artistName) {
    data.append('notation[artist_name]', artistName);
  }

  if (vextab) {
    data.append('notation[vextab]', vextab);
  }

  if (youtubeVideoId) {
    data.append('notation[youtube_video_id]', youtubeVideoId);
  }

  data.append('notation[tempo]', (tempo && tempo.toString()) || '120');

  if (deadTime) {
    data.append('notation[dead_time]', (deadTime && deadTime.toString()) || '0');
  }

  if (duration) {
    data.append('notation[duration]', (duration && duration.toString()) || '0');
  }

  if (featured !== null && featured !== undefined) {
    data.append('notation[featured]', featured.toString());
  }

  if (tagIds) {
    tagIds.map((id, ndx) => {
      data.append(`notation[taggings_attributes][${ndx}][tag_id]`, id);
    });
  }

  if (thumbnailFile) {
    data.append('notation[thumbnail]', thumbnailFile);
  }

  return data;
};

export default formData;
