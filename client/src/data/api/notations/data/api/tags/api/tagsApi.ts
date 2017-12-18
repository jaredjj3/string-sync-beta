const { $ } = window;

export const fetchTags = () => (
  $.ajax({
    method: 'GET',
    url: '/api/v1/tags'
  })
);
