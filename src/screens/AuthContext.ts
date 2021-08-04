import { useAuthContext as AuthContextProps } from './../hooks/useAuth'
import React from 'react'

const AuthContext = React.createContext<AuthContextProps>({
  auth: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export default AuthContext
