const { $ } = window;

export const login = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/session',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/v1/session'
  })
);
