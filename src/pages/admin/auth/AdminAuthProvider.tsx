import { ReactNode } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminAuthContext } from '@/hooks/useAdminAuthContext'

type AdminAuthProviderProps = {
  children: ReactNode
}

function AdminAuthProvider({ children }: AdminAuthProviderProps): JSX.Element {
  const { auth, loading, signIn, signOut } = useAdminAuth()
  return (
    <AdminAuthContext.Provider value={{ auth, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export default AdminAuthProvider
