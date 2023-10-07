import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from 'providers/user/context'
import { PATHS } from 'utils/consts'

const ProtectedRoutes = () => {
  const { isLogged } = useContext(UserContext)

  return isLogged ? <Outlet /> : <Navigate to={PATHS.login} />
}

export default ProtectedRoutes
