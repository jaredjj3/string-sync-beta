const { $ } = window;

import formData from './formData';

export const fetchNotation = id => (
  $.ajax({
    method: 'GET',
    url: `/api/v1/notations/${id}`
  })
);

export const createNotation = notation => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/notations',
    data: formData(notation),
    contentType: false,
    processData: false
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

export const destroyNotation = notationId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/v1/notations/${notationId}`
  })
);
