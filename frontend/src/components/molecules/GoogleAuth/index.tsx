import { FcGoogle } from 'react-icons/fc'
import useExternalAuth from 'hooks/useExternalAuth'

const GoogleAuth = () => {
  const { googleLogin } = useExternalAuth()

  return (
    <div
      className="external-auth__service external-auth__service--google"
      onClick={() => googleLogin()}>
      <FcGoogle />
    </div>
  )
}

export default GoogleAuth
