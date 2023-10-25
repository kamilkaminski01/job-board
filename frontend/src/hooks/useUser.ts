import { IUpdateUser } from 'models/requests/updateUser'
import { IServerResponse } from 'models/serverResponse'
import { IUser } from 'models/user'
import { UserContext } from 'providers/user/context'
import { useCallback, useContext, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'

const useUser = () => {
  const { updateUserData } = useContext(UserContext)
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
    async (data: IUpdateUser): Promise<IServerResponse> => {
      try {
        await axiosDefault.patch(ENDPOINTS.user, data)

        updateUserData()

        return { succeed: true }
      } catch (error) {
        return parseApiErrors(error)
      }
    },
    [updateUserData]
  )

  return { userData, getUserData, updateUser }
}

export default useUser
