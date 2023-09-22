export const loginService = (token: any) => {
  fetch('/api/login', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
