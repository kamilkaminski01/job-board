import './style.scss'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'
import BackgroundImage from 'assets/images/expansion-image-default.jpg'

const AuthBackground = () => {
  const { themeColors } = useContext(ThemeContext)

  return (
    <div className="auth-bg">
      <img src={BackgroundImage} className="auth-bg__image" />
      <div className="auth-bg__image-mask" style={{ backgroundColor: themeColors.primaryColor }} />
    </div>
  )
}

export default AuthBackground
