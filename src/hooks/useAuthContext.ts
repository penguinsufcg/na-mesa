import React, { useContext } from 'react'
import { AuthContextProps } from './useAuth'

export const AuthContext = React.createContext<AuthContextProps>({
  auth: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

function useAuthContext(): AuthContextProps {
  const context = useContext<AuthContextProps>(AuthContext)

  return context
}

export default useAuthContext
