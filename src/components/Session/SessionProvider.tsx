import { useFirestoreListQuery } from '@/hooks/useFirestoreQuery'
import { SessionContext } from '@/hooks/useSessionContext'
import { ReactNode } from 'react'

type SessionContextProps = {
  children: ReactNode
}

function SessionProvider({ children }: SessionContextProps): JSX.Element {
  const { data: session } = useFirestoreListQuery<Session>(
    db.collection('sessions').where('code', '==', sessionCode),
  )
  return (
    <SessionContext.Provider value={...session}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
