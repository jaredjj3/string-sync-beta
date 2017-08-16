const $ = (window as any).$;

export const createNotation = (formData, success, error) => {
  $.ajax({
    method: 'POST',
    url: '/api/notations',
    data: formData,
    contentType: false,
    processData: false,
    success,
    error,
  });
};

export const fetchNotations = (id, success, error) => {
  $.ajax({
    method: 'GET',
    url: `/api/notations/${id}`,
    success,
    error,
  });
};

export const updateNotation = (notation, success, error) => {
  const id = notation.id;

  $.ajax({
    method: 'PATCH',
    url: `/api/notations/${id}`,
    data: { notation },
    success,
    error,
  });
};
