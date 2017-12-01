const { $ } = window;

export const createUser = user => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/users',
    data: user
  })
);
