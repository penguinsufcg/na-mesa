import { useCallback, useEffect, ReactNode, useMemo, useState } from 'react'
import { db } from '@/config/firebaseClient'
import { useFirestoreObjectQuery } from '@/hooks/useFirestoreQuery'
import { SessionContext } from '@/hooks/useSession'
import { createSession } from 'api/session'
import { generateRandomCode } from 'utils/codeGenerator'

type SessionContextProps = {
  children: ReactNode
}

function SessionProvider({ children }: SessionContextProps): JSX.Element {
  const [session, setSession] = useState<EntityWithID<Session> | null>(null)
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)
  const { data, isLoading, error } = useFirestoreObjectQuery<Session>(
    sessionId ? db.collection('sessions').doc(sessionId) : null
  )

  const getSessionLocal = () => {
    const sessionId = localStorage.getItem('sessionId')

    return sessionId
  }

  const saveSessionLocal = useCallback(() => {
    if (!session) {
      return
    }
    localStorage.setItem('sessionId', session.id)
  }, [session])

  const createNewSession = async ({ table, client }: { table: string, client: string }) => {
    const secretCode = generateRandomCode()

    const session = await createSession({
      code: secretCode.toString(),
      client,
      orders: [],
      table,
    })

    if (!session) {
      throw new Error('Error creating session')
    }

    setSession(session)

    return session?.code
  }

  const joinSession = ({ sessionId }: { sessionId: string }) => {
    setSessionId(sessionId)
  }

  useEffect(() => {
    const sessionId = getSessionLocal()

    if(!sessionId) {
      return
    }
    setSessionId(sessionId)
  }, [])

  useEffect(() => {
    if (!data) {
      return
    }

    setSession(data)
  }, [data])

  useEffect(() => {
    saveSessionLocal()
  }, [session, saveSessionLocal])

  const context = useMemo(() => ({
    session,
    logged: !!session,
    isLoading,
    createNewSession,
    joinSession,
  }), [session, isLoading])

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
