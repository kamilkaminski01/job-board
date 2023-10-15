import { useGoogleLogin } from '@react-oauth/google'
import axiosAuth from 'setup/axios/authInstance'
import { ENDPOINTS, LOCAL_STORAGE, PATHS } from 'utils/consts'
import { useContext } from 'react'
import { UserContext } from 'providers/user/context'
import { useNavigate } from 'react-router-dom'
import { parseApiErrors } from 'utils/parseApiErrors'
import useAuth from 'hooks/useAuth'

const useExternalAuth = () => {
  const { login: loginContext } = useContext(UserContext)
  const navigate = useNavigate()
  const { setIsLoading, setErrorMessage } = useAuth()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        setIsLoading(true)

        const response = await axiosAuth.post(ENDPOINTS.externalAuth, {
          provider: 'google-oauth2',
          code: codeResponse.code,
          redirectUri: window.location.origin
        })

        localStorage.setItem(LOCAL_STORAGE.accessToken, response.data.token)
        localStorage.setItem(LOCAL_STORAGE.refreshToken, response.data.refresh)

        loginContext()
        navigate(PATHS.profile)

        return { succeed: true }
      } catch (error) {
        const serverResponse = parseApiErrors(error)

        setErrorMessage(serverResponse.errorMessage || '')

        return { succeed: false }
      } finally {
        setIsLoading(false)
      }
    },
    onError: (errorResponse) => {
      const serverResponse = parseApiErrors(errorResponse)

      setErrorMessage(serverResponse.errorMessage || '')
    }
  })

  return { googleLogin }
}

export default useExternalAuth
