import cookie from 'cookie'

const MAX_AGE = 7 * 24 * 60 * 60

export const setTokenCookie = (token: string) => {
  const setCookie = cookie.serialize('token', token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  })
  return setCookie
}

export const getTokenCookie = () => {
  const getCookie = cookie.parse(document.cookie)
  return getCookie.token ?? null
}

export const removeCookie = () => {
  document.cookie = ''
}
