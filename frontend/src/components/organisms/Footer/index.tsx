import './style.scss'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const Footer = () => {
  const { themeColors } = useContext(ThemeContext)

  return <div className="footer" style={{ backgroundColor: themeColors.primaryColor }} />
}

export default Footer
