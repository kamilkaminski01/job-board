import { IUpdateUser } from 'models/requests/updateUser'
import { IServerResponse } from 'models/serverResponse'
import { IUser } from 'models/user'
import { UserContext } from 'providers/user/context'
import { useCallback, useContext, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS, PATHS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'
import { useNavigate } from 'react-router-dom'

const useUser = () => {
  const { updateUserData, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [userData, setUserData] = useState({} as IUser)

  const getUserData = useCallback(async (): Promise<IServerResponse> => {
    try {
      const response = await axiosDefault.get(ENDPOINTS.user)

      setUserData(response.data)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
  }, [])

  const updateUser = useCallback(
    async (
      data: IUpdateUser | FormData,
      updateImage: boolean = false
    ): Promise<IServerResponse> => {
      try {
        if (updateImage) {
          await axiosDefault.patch(ENDPOINTS.userImage, data)
        } else {
          await axiosDefault.patch(ENDPOINTS.user, data)
        }

        updateUserData()

        return { succeed: true }
      } catch (error) {
        return parseApiErrors(error)
      }
    },
    [updateUserData]
  )

  const deleteUser = useCallback(async (): Promise<IServerResponse> => {
    try {
      await axiosDefault.delete(ENDPOINTS.user)

      logout()
      navigate(PATHS.login)

      return { succeed: true }
    } catch (error) {
      return parseApiErrors(error)
    }
  }, [logout, navigate])

  return { userData, getUserData, updateUser, deleteUser }
}

export default useUser
