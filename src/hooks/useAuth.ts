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
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

function formatAuth(auth: firebase.User) {
  return {
    uid: auth.uid,
    email: auth.email,
    name: auth.displayName,
    photoUrl: auth.photoURL,
  }
}

export function useAuth(): AuthContextProps {
  const [auth, setAuth] = useState<Auth | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const clear = () => {
    setLoading(false)
    setAuth(null)
  }

  const signIn = () =>
    firebaseAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((_) => console.log('User logged in'))
      .catch((e) => console.log(e))

  const signOut = () => firebaseAuth.signOut().then(clear)

  const handleAuthStateChange = async (authState: firebase.User | null) => {
    if (!authState) {
      setAuth(null)
      setLoading(false)
      return
    }
    console.log(authState)
    setAuth(formatAuth(authState))
    setLoading(false)
  }

  useEffect(() => {
    // This effect will be triggered whenever an user sign in or sign out in
    // our website. The [onAuthStateChanged] firebase method
    // is an observer and returns an unsubscriber
    // executed when the component is unmounted
    const observer = firebaseAuth.onAuthStateChanged(handleAuthStateChange)
    return () => observer()
  }, [])

  return {
    auth,
    loading,
    signIn,
    signOut,
  }
}
