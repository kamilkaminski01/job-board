const url = window.location

export const API_URL =
  url.port !== '' ? `${url.protocol}//${url.hostname}:8000/api/` : `${url.origin}/api/`

export const ENDPOINTS = {
  user: 'user/',
  userImage: 'user/image/',

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

export const GOOGLE_AUTH = {
  clientId: '661500498894-e9g8dpfm40ggk27sqire5eavm86lik5f.apps.googleusercontent.com'
}

export const GITHUB_AUTH = {
  authUrl: 'https://github.com/login/oauth/authorize',
  clientId: '3fac93f687a04c52de98'
}
