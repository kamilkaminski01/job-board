import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import useExternalAuth from 'hooks/useExternalAuth'
import { useEffect } from 'react'
import { GITHUB_AUTH, LOCAL_STORAGE } from 'utils/consts'

const ExternalAuth = () => {
  const { googleLogin, githubLogin, errorMessage } = useExternalAuth()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const codeParam = urlParams.get('code')
    if (codeParam && localStorage.getItem(LOCAL_STORAGE.accessToken) === null) {
      githubLogin(codeParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const redirectGitHubAuth = () => {
    window.location.assign(`${GITHUB_AUTH.authUrl}?client_id=${GITHUB_AUTH.clientId}&scope=user`)
  }

  return (
    <>
      <div className="external-auth__services">
        <div className="external-auth__service" onClick={googleLogin}>
          <FcGoogle />
        </div>
        <div className="external-auth__service" onClick={redirectGitHubAuth}>
          <FaGithub />
        </div>
      </div>
      {errorMessage && <p className="auth-card__error-message">{errorMessage}</p>}
    </>
  )
}

export default ExternalAuth
