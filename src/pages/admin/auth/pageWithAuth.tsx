import useAdminAuthContext from '@/hooks/useAdminAuthContext'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'

function pageWithAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { auth } = useAdminAuthContext()
    const Router = useRouter()

    // Checks if it's on client/browser or server
    if (typeof window !== 'undefined') {

      // If there is no auth, redirects to "/admin" (login) page.
      if (!auth) {
        Router.replace('/admin')
        return null
      }

      // If there is an auth, render the component that was passed with all its props

      return <Component {...props} />
    }

    // If it's on server, return null
    return null
  }

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default pageWithAuth
