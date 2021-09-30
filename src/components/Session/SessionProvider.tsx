import { occupyTable } from '@/api/tables'
import { useFirestoreObjectQuery } from '@/hooks/useFirestoreObjectQuery'
import { SessionContext } from '@/hooks/useSession'
import { createSession } from 'api/session'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { generateRandomCode } from 'utils/codeGenerator'

type SessionContextProps = {
  children: ReactNode
}

function SessionProvider({ children }: SessionContextProps): JSX.Element {
  const [session, setSession] = useState<EntityWithID<Session> | null>(null)
  const [sessionId, setSessionId] = useState<string | undefined>(undefined)
  const { data, isLoading } = useFirestoreObjectQuery<Session>(
    `sessions/${sessionId}`,
    [sessionId],
  )

  const getSessionLocal = () => {
    const sessionId = localStorage.getItem('sessionId')

    return sessionId
  }

  const createNewSession = async ({
    table,
    client,
  }: {
    table: string
    client: string
  }) => {
    const secretCode = generateRandomCode()

    const [session, sessionRef] = await createSession({
      code: secretCode.toString(),
      client,
      orders: [],
      table,
      openTime: new Date().toISOString(),
    })

    if (!session) {
      throw new Error('Error creating session')
    }
    await occupyTable(table, sessionRef)

    setSession(session)

    return session?.code
  }

  const joinSession = ({ sessionId }: { sessionId: string }) => {
    setSessionId(sessionId)
  }

  useEffect(() => {
    const sessionId = getSessionLocal()

    if (!sessionId) {
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
    if (!session) {
      return
    }

    localStorage.setItem('sessionId', session.id)
    setSessionId(session.id)
  }, [session])

  const context = useMemo(
    () => ({
      session,
      isLogged: sessionId && sessionId !== 'undefined' ? true : false,
      isLoading,
      createNewSession,
      joinSession,
    }),
    [session, sessionId, isLoading],
  )

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
