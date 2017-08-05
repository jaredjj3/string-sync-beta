const $ = (window as any).$;

export const fetchAllNotations = () => (
  $.ajax({
    method: 'GET',
    url: '/api/v1/notations'
  })
);
