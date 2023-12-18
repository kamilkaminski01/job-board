import { AuthCardProps } from './interface'
import { Link } from 'react-router-dom'
import Button from 'components/atoms/Button'
import './style.scss'
import ExternalAuth from 'components/molecules/ExternalAuth'
import { useContext } from 'react'
import { ThemeContext } from 'providers/theme/context.ts'

const AuthCard = ({
  children,
  title,
  switchBox,
  description,
  externalAuth,
  submitButton
}: AuthCardProps) => {
  const { themeColors } = useContext(ThemeContext)

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <h1 className="auth-card__title">{title}</h1>

        {switchBox && (
          <div className="auth-card__switch">
            <p className="switch__text">{switchBox.text}</p>
            <Link to={switchBox.link} style={{ color: themeColors.primaryColor }}>
              {switchBox.linkText}
            </Link>
          </div>
        )}

        {description && <p className="auth-card__description">{description}</p>}
      </div>

      {externalAuth && (
        <>
          <div className="auth-card__external-auth">
            <h3 className="external-auth__title">{externalAuth.text}</h3>
            <ExternalAuth />
          </div>

          <div className="auth-card__separator">
            <div className="separator__line"></div>
            <span className="separator__text">or</span>
            <div className="separator__line"></div>
          </div>
        </>
      )}

      {children}
      {submitButton && (
        <Button
          className="auth-card__submit-btn"
          disable={submitButton.disabled}
          type="submit"
          form={submitButton.formID}>
          {submitButton.text}
        </Button>
      )}
    </div>
  )
}

export default AuthCard
