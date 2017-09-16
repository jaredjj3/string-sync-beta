const $ = (window as any).$;

const formData = (notation) => {
  const { name, artistName, thumbnailFile, youtubeVideoId, tagIds, duration, deadTime } = notation;
  const data = new FormData();

  data.append('notation[name]', name);
  data.append('notation[artist_name]', artistName);
  data.append('notation[youtube_video_id]', youtubeVideoId);

  if (tagIds) {
    data.append('notation[tags_attributes][]', tagIds.map(id => JSON.stringify({ id })));
  }

  if (typeof deadTime === 'number') {
    data.append('notation[dead_time]', deadTime.toString());
  }

  if (typeof duration === 'number') {
    data.append('notation[duration]', duration.toString());
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
