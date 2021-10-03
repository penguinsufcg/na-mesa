import { db } from '@/config/firebaseClient'
import { useState } from 'react'

interface Auth {
  uid?: string
  email?: string | null
  name?: string | null
}

export interface AdminAuthContextProps {
  auth: Auth | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
}

export function useAdminAuth(): AdminAuthContextProps {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const clear = () => {
    setLoading(false)
    setAuth(null)
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const authQuery = await db
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .limit(1)
      .get()

    const authData = authQuery.docs[0]

    setLoading(false)
    setAuth({ uid: authData?.id, ...(authData?.data() as Auth) })
    return true
  }

  const signOut = () => {
    clear()
  }

  return {
    auth,
    loading,
    signIn,
    signOut,
  }
}
