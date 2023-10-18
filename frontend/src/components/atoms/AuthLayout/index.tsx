import AuthBackground from 'components/molecules/AuthBackground'
import { Outlet } from 'react-router-dom'
import './style.scss'
import GoogleProvider from 'providers/google'

const AuthLayout = () => {
  return (
    <GoogleProvider>
      <div className="auth-layout">
        <AuthBackground />
        <Outlet />
      </div>
    </GoogleProvider>
  )
}

export default AuthLayout
