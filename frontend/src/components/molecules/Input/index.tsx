import classNames from 'classnames'
import ErrorMessage from 'components/atoms/ErrorMessage'
import { useFormContext } from 'react-hook-form'
import { InputProps } from './interface'
import './style.scss'

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  validators = {},
  defaultValue,
  className = '',
  hideErrors = false
}: InputProps) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext()

  const inputValue: string = watch(name, defaultValue)

  return (
    <div className={classNames('input-wrapper', className)}>
      <input
        className={classNames('input-wrapper__input', {
          'input-wrapper__input--required': validators.required,
          'input-wrapper__input--filled': inputValue,
          'input-wrapper__input--invalid': !hideErrors && errors[name]
        })}
        id={name}
        data-testid={name}
        autoComplete="off"
        type={type}
        defaultValue={defaultValue}
        {...register(name, validators)}
      />
      <label htmlFor={name} className="input-wrapper__label">
        {placeholder}
      </label>
      {!hideErrors && errors[name] && (
        <ErrorMessage message={`${errors[name]?.message}`} fieldName={name} />
      )}
    </div>
  )
}

export default Input
