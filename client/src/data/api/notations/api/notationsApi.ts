const { $ } = window;

export const fetchNotations = () => (
  $.ajax({
    method: 'GET',
    url: '/api/v1/notations'
  })
);
