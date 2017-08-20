const $ = (window as any).$;

export const createNotation = formData => (
  $.ajax({
    method: 'POST',
    url: '/api/notations',
    data: formData,
    contentType: false,
    processData: false
  })
);

export const fetchNotation = id => (
  $.ajax({
    method: 'GET',
    url: `/api/notations/${id}`
  })
);

export const updateNotation = notation => {
  const id = notation.id;

  return (
    $.ajax({
      method: 'PATCH',
      url: `/api/notations/${id}`,
      data: { notation }
    })
  );
};
