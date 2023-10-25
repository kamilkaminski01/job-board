import useUser from 'hooks/useUser'
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { LOCAL_STORAGE } from 'utils/consts'
import { UserContext } from './context'

const accessToken = localStorage.getItem(LOCAL_STORAGE.accessToken)

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { userData, getUserData } = useUser()

  const [isLogged, setIsLogged] = useState(!!accessToken)

  const updateUserData = () => getUserData()

  const login = useCallback(async () => {
    setIsLogged(true)

    const userDataResponse = await getUserData()

    if (!userDataResponse.succeed) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    setIsLogged(false)
  }

  useEffect(() => {
    if (accessToken) {
      login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={{ userData, isLogged, updateUserData, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
