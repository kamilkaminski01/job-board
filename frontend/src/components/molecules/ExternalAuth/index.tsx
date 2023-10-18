import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin } from 'react-icons/fa'
import useExternalAuth from 'hooks/useExternalAuth'

const ExternalAuth = () => {
  const { googleLogin, secondaryLogin, errorMessage } = useExternalAuth()

  return (
    <>
      <div className="external-auth__services">
        <div className="external-auth__service" onClick={googleLogin}>
          <FcGoogle />
        </div>
        <div className="external-auth__service" onClick={secondaryLogin}>
          <FaLinkedin color="#069" />
        </div>
      </div>
      {errorMessage && <p className="auth-card__error-message">{errorMessage}</p>}
    </>
  )
}

export default ExternalAuth
