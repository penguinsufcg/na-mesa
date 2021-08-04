import { ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import AuthContext from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { auth, loading, signIn, signOut } = useAuth()
  return (
    <AuthContext.Provider value={{ auth, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
