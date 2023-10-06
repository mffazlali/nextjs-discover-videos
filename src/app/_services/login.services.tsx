export const loginService = async(token: any) => {
  const response = fetch('/api/login', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response
}
