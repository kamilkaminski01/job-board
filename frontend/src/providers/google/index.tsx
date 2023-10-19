import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { PropsWithChildren } from 'react'
import { GOOGLE_AUTH } from 'utils/consts'

const GoogleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <GoogleOAuthProvider clientId={GOOGLE_AUTH.clientId}>{children}</GoogleOAuthProvider>
}

export default GoogleProvider
