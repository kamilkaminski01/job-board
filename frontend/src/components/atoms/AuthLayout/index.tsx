import AuthBackground from 'components/molecules/AuthBackground'
import { Outlet } from 'react-router-dom'
import './style.scss'

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <AuthBackground />
      <Outlet />
    </div>
  )
}

export default AuthLayout
