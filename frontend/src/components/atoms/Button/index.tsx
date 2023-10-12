import { ButtonProps } from './interface'
import './style.scss'

const Button = ({
  children,
  type = 'submit',
  className = '',
  disable = false,
  form,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      form={form}
      disabled={disable}
      onClick={onClick}>
      {children || 'Button'}
    </button>
  )
}

export default Button
