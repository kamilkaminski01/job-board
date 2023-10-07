import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { API_URL, LOCAL_STORAGE, PATHS } from 'utils/consts'
import { refreshToken } from 'utils/refreshToken'

const axiosDefault = axios.create({
  baseURL: API_URL
})

axiosDefault.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.accessToken)

    if (accessToken && typeof accessToken !== 'undefined') {
      config.headers!.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const refreshAuthLogic = async (failedRequest: any) => {
  const response = await refreshToken()

  if (response.succeed) {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.accessToken)
    failedRequest.response.config.headers = `Bearer ${accessToken}`

    return Promise.resolve()
  } else {
    localStorage.removeItem(LOCAL_STORAGE.accessToken)
    localStorage.removeItem(LOCAL_STORAGE.refreshToken)

    window.location.href = PATHS.login

    return Promise.reject(failedRequest)
  }
}

createAuthRefreshInterceptor(axiosDefault, refreshAuthLogic)

export default axiosDefault
