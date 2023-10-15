const url = window.location

export const API_URL =
  url.port !== '' ? `${url.protocol}//${url.hostname}:8000/api/` : `${url.origin}/api/`

export const ENDPOINTS = {
  user: 'user/',

  getToken: 'token/',
  refreshToken: 'token/refresh/',
  externalAuth: 'login/social/jwt-pair-user/'
}

export const PATHS = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  settings: '/settings'
}

export const LOCAL_STORAGE = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
}
