import classNames from 'classnames'
import { ErrorMessageProps } from './interface'
import './style.scss'

const ErrorMessage = ({ className, message, fieldName }: ErrorMessageProps) => {
  return (
    <span
      className={classNames('error-message', className)}
      data-testid={fieldName && `${fieldName}ErrorMessage`}>
      {message}
    </span>
  )
}

export default ErrorMessage
