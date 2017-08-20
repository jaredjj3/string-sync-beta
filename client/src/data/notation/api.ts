const $ = (window as any).$;

export const createNotation = formData => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/notations',
    data: formData,
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

export const updateNotation = notation => {
  const id = notation.id;

  return (
    $.ajax({
      method: 'PATCH',
      url: `/api/v1/notations/${id}`,
      data: { notation }
    })
  );
};
