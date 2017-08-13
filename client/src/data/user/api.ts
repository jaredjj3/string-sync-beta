const $ = (window as any).$;

export const createUser = user => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/users',
    data: user
  })
);
