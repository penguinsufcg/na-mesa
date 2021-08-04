import { useContext } from 'react'
import AuthContext from '../screens/AuthContext'
import { useAuthContext as AuthContextProps } from './useAuth'

function useAuthContext(): AuthContextProps {
  const context = useContext<AuthContextProps>(AuthContext)

  return context
}

export default useAuthContext
