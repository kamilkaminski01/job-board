import { ButtonProps } from './interface'
import './style.scss'
import { useContext, useState } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const Button = ({
  children,
  type = 'submit',
  className = '',
  disable = false,
  form,
  onClick
}: ButtonProps) => {
  const { themeColors } = useContext(ThemeContext)
  const [hover, setHover] = useState(false)

  const outlineStyles = {
    color: hover ? 'white' : themeColors.primaryColor,
    borderColor: hover ? themeColors.hoverColor : themeColors.primaryColor,
    backgroundColor: hover ? themeColors.hoverColor : ''
  }

  const regularStyles = {
    backgroundColor: hover ? themeColors.hoverColor : themeColors.primaryColor
  }

  return (
    <button
      className={`btn ${className}`}
      type={type}
      form={form}
      disabled={disable}
      onClick={onClick}
      style={className.includes('btn--outline') ? outlineStyles : regularStyles}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {children || 'Button'}
    </button>
  )
}

export default Button
