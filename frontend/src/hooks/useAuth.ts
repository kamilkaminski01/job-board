import { useContext, useState } from 'react'
import { ENDPOINTS, LOCAL_STORAGE, PATHS } from 'utils/consts'
import { useNavigate } from 'react-router-dom'
import { UserContext } from 'providers/user/context'
import { ILogin } from 'models/requests/login'
import { IRegister } from 'models/requests/register'
import { IServerResponse } from 'models/serverResponse'
import axiosAuth from 'setup/axios/authInstance'
import { parseApiErrors } from 'utils/parseApiErrors'

const useAuth = () => {
  const { login: loginContext, logout: logoutContext } = useContext(UserContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const login = async (data: ILogin): Promise<IServerResponse> => {
    try {
      setIsLoading(true)

      const response = await axiosAuth.post(ENDPOINTS.getToken, {
        email: data.email,
        password: data.password
      })

      localStorage.setItem(LOCAL_STORAGE.accessToken, response.data.access)
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
  }

  const register = async (data: IRegister): Promise<IServerResponse> => {
    try {
      setIsLoading(true)

      localStorage.removeItem(LOCAL_STORAGE.accessToken)

      await axiosAuth.post(ENDPOINTS.user, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })

      navigate(PATHS.login)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE.accessToken)
    localStorage.removeItem(LOCAL_STORAGE.refreshToken)

    logoutContext()
    navigate(PATHS.login)
  }

  return {
    errorMessage,
    isLoading,
    login,
    register,
    logout
  }
}

export default useAuth
