const $ = (window as any).$;

export const login = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/session',
    data: user
  })
);

export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/v1/users',
    data: user
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/v1/session'
  })
);
