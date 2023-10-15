import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { PropsWithChildren } from 'react'

const GoogleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const cliendId: string =
    '661500498894-e9g8dpfm40ggk27sqire5eavm86lik5f.apps.googleusercontent.com'
  return <GoogleOAuthProvider clientId={cliendId}>{children}</GoogleOAuthProvider>
}

export default GoogleProvider
