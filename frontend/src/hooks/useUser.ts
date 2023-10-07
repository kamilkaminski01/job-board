import { IServerResponse } from 'models/serverResponse'
import { IUser } from 'models/user'
import { useCallback, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { ENDPOINTS } from 'utils/consts'
import { parseApiErrors } from 'utils/parseApiErrors'

const useUser = () => {
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

  return { userData, getUserData }
}

export default useUser
