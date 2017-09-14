const $ = (window as any).$;

export const fetchTags = () => (
  $.ajax({
    method: 'GET',
    url: '/api/v1/tags'
  })
);
