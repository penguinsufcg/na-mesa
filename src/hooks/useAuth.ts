import firebase, { firebaseAuth } from '../config/firebaseClient'
import { useState } from 'react'

interface Auth {
  uid?: string
  email?: string | null
  name: string | null
  photoUrl?: string | null
}

export function useAuth() {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const clear = () => {
    setLoading(false)
    setAuth(null)
  }

  const signIn = () => {
    firebaseAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((_) => console.log('User logged in'))
      .catch((e) => console.log(e))
  }

  const signOut = () => {
    firebaseAuth.signOut().then(clear)
  }

  return {
    auth,
    loading,
    signIn,
    signOut,
  }
}
