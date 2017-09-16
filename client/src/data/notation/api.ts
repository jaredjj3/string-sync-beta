const $ = (window as any).$;

const formData = (notation) => {
  const {
    name, artistName, thumbnailFile, youtubeVideoId, tagIds,
    duration, deadTime, tempo, featured
  } = notation;

  const data = new FormData();

  if (name) {
    data.append('notation[name]', name);
  }

  if (artistName) {
    data.append('notation[artist_name]', artistName);
  }

  if (youtubeVideoId) {
    data.append('notation[youtube_video_id]', youtubeVideoId);
  }

  if (tempo) {
    data.append('notation[tempo]', (tempo && tempo.toString()) || '120');
  }

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

export const createNotation = notation => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/notations',
    data: formData(notation),
    contentType: false,
    processData: false
  })
);

export const fetchNotation = id => (
  $.ajax({
    method: 'GET',
    url: `/api/v1/notations/${id}`
  })
);

export const updateNotation = notation => (
  $.ajax({
    method: 'PATCH',
    url: `/api/v1/notations/${notation.id}`,
    data: formData(notation),
    processData: false,
    contentType: false
  })
);
