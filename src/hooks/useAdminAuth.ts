import { useFirestoreListQuery } from '@/hooks/useFirestoreListQuery'
import firebase, { firebaseAuth } from '@/config/firebaseClient'
import { useEffect, useState } from 'react'

interface Auth {
  uid?: string
  email?: string | null
  name: string | null
  photoUrl?: string | null
}

export interface AuthContextProps {
  auth: Auth | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

function formatAuth(auth: firebase.User) {
  return {
    uid: auth.uid,
    email: auth.email,
    name: auth.displayName,
    photoUrl: auth.photoURL,
  }
}

export function useAdminAuth(): AuthContextProps {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const clear = () => {
    setLoading(false)
    setAuth(null)
  }

  const signIn = async (email: string, password: string) => {
    const authData = await firebaseAuth.
      .collection('users')
      .where('email', '==', email)
      .get()

    console.log(authData.docs[0].data())
  }

  const signOut = () => {}

  return {
    auth,
    loading,
    signIn,
    signOut,
  }
}
