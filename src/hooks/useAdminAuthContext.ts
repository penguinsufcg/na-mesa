import React, { Context, useContext } from 'react'
import { AdminAuthContextProps } from '@/hooks/useAdminAuth'

export const AdminAuthContext: Context<AdminAuthContextProps> =
  React.createContext<AdminAuthContextProps>({
    auth: null,
    loading: true,
    signIn: async () => {},
    signOut: async () => {},
  })

const useAdminAuthContext = (): AdminAuthContextProps =>
  useContext<AdminAuthContextProps>(AdminAuthContext)

export default useAdminAuthContext
