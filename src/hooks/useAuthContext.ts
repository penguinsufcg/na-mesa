import React, { Context, useContext } from 'react'
import { AuthContextProps } from '@/hooks/useAuth'

export const AuthContext: Context<AuthContextProps> =
  React.createContext<AuthContextProps>({
    auth: null,
    loading: true,
    signIn: async () => {},
    signOut: async () => {},
  })

const useAuthContext = (): AuthContextProps =>
  useContext<AuthContextProps>(AuthContext)

export default useAuthContext
